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

<script>
export default {
  name: 'About',
  data() {
    return {
      title: 'About Us',
      description: 'This is the best movie application in the world!',
      team: 'Developed by Lasha',
    };
  },
};
</script>
