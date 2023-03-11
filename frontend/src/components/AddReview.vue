<template>
  <div class="card">
    <div class="card-header">
      Add Review
    </div>
    <div class="card-body">
      <form>
        <div class="mb-3">
          <label class="form-label">Message</label>
          <input v-model="message" type="text" class="form-control">
        </div>
        <a @click="saveReview()" class="btn btn-primary">Submit</a></form>
    </div>
  </div>
</template>

<script setup>
import ReviewService from '@/services/ReviewService';
import { ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  movieId: String,
});

const emit = defineEmits(['updateMovieInfo']);

const store = useStore();

const message = ref('');

const saveReview = async () => {
  if (message.value !== '') {
    const data = {
      review: message.value,
      name: store.state.user.name,
      user_id: store.state.user.id,
      movie_id: props.movieId,
    };
    await ReviewService.createReview(data);
    message.value = '';
    emit('updateMovieInfo');
  }
};
</script>

<style scoped>

</style>
