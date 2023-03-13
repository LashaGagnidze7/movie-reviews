<template>
  <div class="card">
    <div class="card-header">{{ movie.title }}</div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <img class="card-img-top" :src="movie.poster" @error="renderDefaultPoster" alt="" />
        </div>
        <div class="col-md-6 col-sm-12">
          <p class="card-text">{{ movie.fullplot }}</p>
          <div>
            <AddReview
              v-if="store.state.user.email"
              :movieId="movie._id"
              @update-movie-info="getMovie"
            />
          </div>
          <hr />
          <h3>Reviews</h3>
          <ul class="list-group">
            <li
              class="list-group-item pb-3 pt-3"
              v-for="comment in movie.comments"
              :key="comment._id"
            >
              <h5 class="card-title">Review by {{ comment.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ getFormattedDate(comment.date) }}</h6>
              <p v-if="!comment.editing" class="card-text">{{ comment.text }}</p>
              <p v-if="comment.editing" class="card-text">
                <input v-model="newComment" type="text" class="form-control" />
              </p>
              <a
                v-if="verifyAuthorship(comment.email)"
                @click="editReview(comment)"
                class="btn btn-primary me-3"
              >
                Edit
              </a>
              <a
                v-if="verifyAuthorship(comment.email)"
                @click="deleteReview(comment._id)"
                class="btn btn-danger"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as moment from "moment";
import MovieService from "@/services/MovieService";
import ReviewService from "@/services/ReviewService";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AddReview from "@/components/AddReview.vue";

const store = useStore();
const route = useRoute();

const movie = ref({});

const newComment = ref("");

const renderDefaultPoster = (e) => {
  e.target.src = require("../assets/Poster_not_available.jpg");
};

const getMovie = async () => {
  movie.value = await MovieService.getMovie(route.params.id);
  movie.value.comments = movie.value.comments.map((v) => ({ ...v, editing: false }));
};

const getFormattedDate = (date) => moment(date).format("Do MMMM YYYY");

const verifyAuthorship = (userEmail) =>
  store.state.user.email && store.state.user.email === userEmail;

const editReview = (comment) => {
  if (comment.editing) {
    comment.text = newComment.value;
    saveUpdatedReview(comment);
    comment.editing = false;
  } else {
    newComment.value = comment.text;
    comment.editing = true;
  }
};

const saveUpdatedReview = async (newComment) => {
  const data = {
    _id: newComment._id,
    text: newComment.text,
    date: new Date(),
  };
  await ReviewService.updateReview(data);
};

const deleteReview = async (commentId) => {
  const data = {
    _id: commentId,
  };
  await ReviewService.deleteReview(data);
  await getMovie();
};

onMounted(() => getMovie());
</script>

<style scoped>
.card-body {
  text-align: center;
}
</style>
