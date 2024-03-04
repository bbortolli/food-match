<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const usuario = computed(() => {
  return store.getters.getUsuario;
});

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <h1>Bem vindo {{ usuario.email }}</h1>
    <div>
      <div
        id="menu"
        class="mb-2"
      >
        <nav>
          <a
            class="cursor-pointer border-r-2 pr-2"
            @click.prevent="$router.push('/vote')"
          >Votar</a>
          <a
            class="cursor-pointer border-r-2 px-2"
            @click.prevent="$router.push('/results')"
          >Resultados</a>
          <a
            class="cursor-pointer pl-2"
            @click.prevent="store.dispatch('logout')"
          >Sair</a>
        </nav>
      </div>
    </div>
  </div>
</template>