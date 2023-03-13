<template>
  <div class="card">
    <div class="card-header">
      Login
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input v-model="userEmail" type="email" class="form-control">
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input v-model="userPassword" type="password" class="form-control">
              </div>
            </div>
          </div>
          <p>{{error}}</p>
        </div>
        <a @click="login()" class="btn btn-primary">Login</a>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import UserService from "@/services/UserService";

const store = useStore();
const router = useRouter();

const userEmail = ref('');
const userPassword = ref('');
const error = ref('');

const login = async () => {
  if (!(userEmail.value === '' || userPassword.value === '')) {
    const user = await UserService.getUserByEmail(userEmail.value);
    if (user) {
      if (user.password === userPassword.value) {
        store.commit('connect', user);
        router.push({path: '/'});
      } else {
        error.value = "Incorrect Password!"
      }
    } else {
      error.value = "Incorrect Email!";
    }
  } else {
    error.value = 'Please enter user data!';
  }
};
</script>
