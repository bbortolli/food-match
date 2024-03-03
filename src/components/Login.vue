<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const emailInput = ref('');
const passwordInput = ref('');
const store = useStore();

function fazLogin() {
  const email = emailInput.value;
  const password = passwordInput.value;
  store.dispatch('login', {
    email, password
  });
}

</script>

<template>
  <div class="h-screen w-screen flex flex-row justify-center items-center">
    <form
      class="flex flex-col h-1/2 w-1/4 justify-center items-center"
      @submit.prevent="fazLogin"
    >
      <input
        v-model="emailInput"
        placeholder="Email"
        class="w-5/6 mb-4 p-2 rounded focus:outline-none border"
        type="email"
        required
      >
      <input
        v-model="passwordInput"
        placeholder="Password"
        class="w-5/6 mb-4 p-2 rounded focus:outline-none border"
        type="password"
        required
      >
      <button
        type="submit"
        class="w-5/6 rounded text-white p-1
                border border-white cursor-pointer
               hover:bg-slate-600 transition delay-150"
      >
        Entrar
      </button>
    </form>
  </div>
</template>
