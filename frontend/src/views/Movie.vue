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
              <p class="card-text">{{ review.review }}</p>
              <a class="btn btn-primary me-3"> Edit </a>
              <a class="btn btn-danger"> Delete </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as moment from 'moment';
import MovieService from "@/services/MovieService";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import AddReview from "@/components/AddReview.vue";

const store = useStore();
const route = useRoute();

const movie = ref({
  poster: '', title: '', rated: '', plot: '', fullplot: '', _id: '', reviews: [],
});

const getMovie = async () => {
  movie.value = await MovieService.getMovie(
    route.params.id
  )
};

const getFormattedDate = (date) => {
  return moment(date).format('Do MMMM YYYY');
};

onMounted(() => getMovie());
</script>

<style scoped>
.card-body {
  text-align: center;
}
</style>
