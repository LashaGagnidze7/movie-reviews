<template>
  <div class="card">
    <div class="card-header"> Movie Results</div>
    <!-- form control -->
    <div class="card-body">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex">
            <input v-model="titleToSearch" class="form-control" placeholder="Search by title"/>
            <a @click="filterMovies('title')" class="btn btn-primary ms-4"> Search</a>
          </div>
        </div>
        <div class="col">
          <div class="d-flex">
            <select v-model="ratingToSearch" class="form-select">
              <option disabled selected value="">Select by Rating</option>
              <option v-for="rating in ratings" :key="rating" :value="rating"> {{ rating }}</option>
            </select>
            <a @click="filterMovies('rated')" class="btn btn-primary ms-4"> Filter </a>
          </div>
        </div>
      </div>
      <!-- form control -->
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="movie in movies" class="col" :key="movie._id">
          <div class="card">
            <img v-if="movie.poster" class="card-img-top" :src="movie.poster" alt=""/>
            <div class="card-body">
              <h5 class="card-title fw-bold">{{ movie.title }}</h5>
              <p v-if="movie.rated" class="card-text"> Rating: {{ movie.rated }} </p>
              <p class="card-text">{{ movie.plot }}</p>
              <a class="btn btn-primary"> View Reviews </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

const movies = ref([]);
const ratings = ref([]);
const titleToSearch = ref('');
const ratingToSearch = ref('');

const getMovies = () => {
  movies.value = [
    {
      _id: '3',
      title: 'Matrix',
      poster: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
      rated: 'AG',
      plot: 'Best movie',
    },
    {
      _id: '4',
      title: 'Matrix 2',
      poster: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
      rated: 'AG',
      plot: 'Best movie',
    },
    {
      _id: '5',
      title: 'Matrix 3',
      poster: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
      rated: 'AG',
      plot: 'Best movie',
    },
  ];
};

const getRatings = () => {
  ratings.value = ['AO', 'G', 'GP'];
};

const filterMovies = (type) => {
  if (type === 'title') {
    console.log(titleToSearch.value);
  } else {
    console.log(ratingToSearch.value);
  }
};

onMounted(() => {
  getMovies();
  getRatings();
});
</script>
<style scoped>
.card-body {
  text-align: left;
}
</style>
