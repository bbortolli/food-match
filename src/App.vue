<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Login from './components/Login.vue';
const store = useStore();

const usuario = computed(() => {
  return store.getters.getUsuario;
});
</script>

<template>
  <div
    id="main"
    class="p-2 w-screen h-screen"
  >
    <div
      v-if="usuario"
      id="conteudo"
      class="p-2 w-full h-full"
    >
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <Login
      v-else
      id="login"
      class="p-2 w-full h-full"
    />
  </div>
</template>