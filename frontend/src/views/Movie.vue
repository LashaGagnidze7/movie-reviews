<template>
  <div class="card">
    <div class="card-header"> {{ movie.title }}</div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <img v-if="movie.poster"
               class="card-img-top" :src="movie.poster" alt=""/></div>
        <div class="col-md-6 col-sm-12">
          <p class="card-text">{{ movie.fullplot }}</p>
          <div>
            <AddReview
              v-if="store.state.user.id"
              :movieId="movie._id"
              @update-movie-info="getMovie"
            />
          </div>
          <hr/>
          <h3>Reviews</h3>
          <ul class="list-group">
            <li class="list-group-item pb-3 pt-3" v-for="review in movie.reviews"
                :key="review._id">
              <h5 class="card-title">Review by {{ review.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ getFormattedDate(review.date) }}</h6>
              <p v-if="!review.editing" class="card-text">{{ review.review }}</p>
              <p v-if="review.editing" class="card-text">
                <input v-model="newReviewMessage" type="text" class="form-control"/>
              </p>
              <a v-if="verifyAuthorship(review.user_id)"
                 @click="editReview(review)"
                 class="btn btn-primary me-3"
              >
                Edit
              </a>
              <a v-if="verifyAuthorship(review.user_id)"
                 @click="deleteReview(review._id)"
                 class="btn btn-danger">
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
import * as moment from 'moment';
import MovieService from '@/services/MovieService';
import ReviewService from '@/services/ReviewService';
import {onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import AddReview from '@/components/AddReview.vue';

const store = useStore();
const route = useRoute();

const movie = ref({});

const newReviewMessage = ref('');

const getMovie = async () => {
  movie.value = await MovieService.getMovie(
    route.params.id,
  );
  movie.value.reviews = movie.value.reviews.map((v) => ({...v, editing: false}));
};

const getFormattedDate = (date) => moment(date).format('Do MMMM YYYY');

const verifyAuthorship = (reviewUserId) => store.state.user.id && store.state.user.id === reviewUserId;

const editReview = (review) => {
  if (review.editing) {
    review.review = newReviewMessage.value;
    saveUpdatedReview(review);
    review.editing = false;
  } else {
    newReviewMessage.value = review.review;
    review.editing = true;
  }
};

const saveUpdatedReview = async (newReview) => {
  const data = {
    review: newReview.review,
    name: newReview.name,
    user_id: newReview.user_id,
    movie_id: newReview.movie_id,
    review_id: newReview._id,
  };
  await ReviewService.updateReview(data);
};

const deleteReview = async (reviewId) => {
  const data = {
    user_id: store.state.user.id,
    review_id: reviewId,
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
