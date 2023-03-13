<template>
  <div class="card">
    <div class="card-header">Login</div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input v-model="userEmail" type="email" class="form-control" />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input v-model="userName" type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input v-model="userPassword" type="password" class="form-control" />
              </div>
            </div>
          </div>
          <p>{{ error }}</p>
        </div>
        <a @click="register()" class="btn btn-primary">Register</a>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import UserService from "@/services/UserService";

const store = useStore();
const router = useRouter();

const userEmail = ref("");
const userName = ref("");
const userPassword = ref("");
const error = ref("");

const normalize = (name) =>
  name
    .split(" ")
    .map((v) => v.charAt(0).toLowerCase() + v.slice(1))
    .join("_");

const register = async () => {
  if (!(userEmail.value === "" || userPassword.value === "" || userName.value === "")) {
    const name = normalize(userName.value);
    const userByEmail = await UserService.getUserByEmail(userEmail.value);
    const userByName = await UserService.getUserByName(name);
    if (userByEmail) {
      error.value = `This email address is already used by ${userByEmail.name}`;
    } else if (userByName) {
      error.value = `This name is already taken by ${userByName.email}`;
    } else {
      const data = {
        name: name,
        email: userEmail.value,
        password: userPassword.value,
      };
      await UserService.registerUser(data);
      store.commit("connect", await UserService.getUserByEmail(userEmail.value));
      await router.push({ path: "/" });
    }
  } else {
    error.value = "Please enter user data!";
  }
};
</script>
