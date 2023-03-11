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
              <router-link :to="'/movie/'+ movie._id" class="btn btn-primary">
                View Reviews
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <ul class="pagination ms-3">
        <li class="page-item">
          <a class="page-link pointer" @click="getPrevPage"> Get previous
            {{ entriesPerPage }}
          </a>
        </li>
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
            Showing Page: {{ currentPage }}
          </a>
        </li>
        <li class="page-item">
          <a class="page-link pointer" @click="getNextPage">
            Get next {{ entriesPerPage }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import MovieService from '@/services/MovieService';
import {onMounted, ref} from 'vue';

const movies = ref([]);
const ratings = ref([]);
const titleToSearch = ref('');
const ratingToSearch = ref('');
const typeToSearch = ref('');
const currentPage = ref(0);
const entriesPerPage = ref(20);
const totalPages = ref(0);

const getMovies = async () => {
  let query = '';
  if (typeToSearch.value === 'title') {
    query = titleToSearch;
  } else if (typeToSearch.value === 'rated') {
    query = ratingToSearch.value;
  }

  const moviesData = await MovieService.getMovies(
    query, typeToSearch.value, currentPage.value
  );

  totalPages.value = Math.ceil(
    movies.total_results / entriesPerPage
  ) - 1;
  movies.value = moviesData.movies;
};

const getRatings = async () => {
  ratings.value = await MovieService.getRatings();
};

const filterMovies = async (type) => {
  typeToSearch.value = type;
  currentPage.value = 0;
  await getMovies();
};

const getNextPage = async () => {
  currentPage.value++;
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
  await getMovies();
};

const getPrevPage = async () => {
  currentPage.value--;
  if (currentPage < 0) {
    currentPage.value = 0;
  }
  await getMovies();
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
