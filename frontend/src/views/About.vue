<template>
  <div class="card">
    <div class="card-header">
      {{ title }}
    </div>
    <div class="card-body">
      <h5 class="card-title">This is an about page</h5>
      <p>{{ description }}</p>
      <p>{{ team }}</p>
    </div>
  </div>
</template>

<script setup>
const title = 'About Us';
const description = 'This is the best movie application in the world!';
const team = 'Developed by Lasha';
</script>
