<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Movies APP</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link active">Home</router-link>
          <router-link to="/movies" class="nav-link active"> Movies</router-link>
          <router-link to="/about" class="nav-link active"> About</router-link>
          <router-link v-if="!userData" to="/login" class="nav-link active"> Login </router-link>
          <router-link v-if="!userData" to="/register" class="nav-link active">
            Register
          </router-link>
          <a v-if="userData" @click="logout" class="nav-link active pointer">
            Logout ({{ userData }})
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const userData = computed(() => {
  if (store.state.user._id) {
    return store.state.user.name;
  }
  return "";
});

const logout = () => store.commit("disconnect");
</script>
