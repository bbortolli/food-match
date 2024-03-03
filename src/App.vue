<script setup>
import { computed, watch } from 'vue';
import { router } from './routes';
import { useStore } from 'vuex';
const store = useStore();

const usuario = computed(() => {
  return store.getters.getUsuario;
});

watch(usuario, (newValue) => {
  if (newValue) {
    router.push('/');
  } else {
    router.push('/login');
  }
});
</script>

<template>
  <div
    id="main"
    class="p-2"
  >
    <div
      id="menu"
      class="mb-2"
    >
      <nav>
        <a
          class="cursor-pointer"
          @click.prevent="$router.push('/vote')"
        >Vote</a>
        <a
          class="cursor-pointer"
          @click.prevent="$router.push('/results')"
        >Results</a>
      </nav>
    </div>
    <div id="conteudo">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>