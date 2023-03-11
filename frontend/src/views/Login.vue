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
              <label class="col-sm-2 col-form-label">ID</label>
              <div class="col-sm-10">
                <input v-model="userId" type="number" class="form-control">
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input v-model="userName" type="text" class="form-control">
              </div>
            </div>
          </div>
        </div>
        <a @click="login()" class="btn btn-primary">Submit</a>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const userId = ref('');
const userName = ref('');

const login = () => {
  if(!(userId.value === '' || userName.value === '')) {
    store.commit('connect', {
      id: userId.value,
      name: userName.value,
    });
    router.push({path: '/'});
  }
};
</script>

