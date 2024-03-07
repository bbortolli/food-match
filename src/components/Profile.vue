<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const displayNameInput = ref('');
const store = useStore();

const { displayName } = store.getters.getUsuario;
function alteraNome() {
  const displayName = displayNameInput.value;
  store.dispatch('alteraNome', { displayName });
}

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <input
      v-model="displayNameInput"
      class="p-2 rounded focus:outline-none"
      type="text"
      :placeholder="displayName || 'Nome...'"
    >
    <div class="flex justify-center items-center mt-2">
      <a
        class="cursor-pointer border-r-2 pr-2 underline"
        @click.prevent="alteraNome"
      >
        Alterar
      </a>
      <a
        class="cursor-pointer pl-2 underline"
        @click.prevent="$router.back()"
      >
        Voltar
      </a>
    </div>
  </div>
</template>