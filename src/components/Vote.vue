<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { opcoesVoto, lugares } from '../const';
const store = useStore();

const formularioDados = ref({});

async function enviarFormulario() {
  const dados = formularioDados.value;
  const qtdLugares = lugares.length;
  const qtdDados = Object.keys(dados).length;
  if (qtdLugares === qtdDados) {
    await store.dispatch('createMatch', dados);
    alert('Registrado !');
  } else {
    alert('Preencha tudo !');
  }
}

</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <table class="h-3/4 w-3/4">
      <tr>
        <th class="text-center w-1/6">
          Lugares
        </th>
        <th
          v-for="opcao in opcoesVoto"
          :key="opcao.valor"
          class="text-center w-1/6"
        >
          {{ opcao.texto }}
        </th>
      </tr>
      <tr
        v-for="lugar in lugares"
        :key="lugar.nome"
      >
        <td class="text-right">
          {{ lugar.texto }}
        </td>
        <td
          v-for="opcao in opcoesVoto"
          :key="opcao.valor"
          class="text-center"
        >
          <input
            v-model="formularioDados[lugar.nome]"
            type="radio"
            :name="lugar.nome"
            :value="opcao.valor"
          >
        </td>
      </tr>
    </table>

    <div class="botoes">
      <a
        class="cursor-pointer border-r-2 pr-2 underline"
        @click.prevent="enviarFormulario"
      >
        Enviar
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

<style scoped>
.botoes {
  margin-top: 1.25em;
}

input[type="radio"] {
  height: 1.2rem;
  width: 1.2rem;
}
</style>
