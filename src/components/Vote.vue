<script setup>
import { computed, ref } from 'vue';
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

const screenWidth = ref(screen.width);

const isMobile = computed(() => {
  return screenWidth.value < 480;
});

</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <table class="w-full h-full md:h-3/4 md:w-3/4">
      <tr>
        <th class="text-center text-xs md:text-md w-1/6 px-1 py-0">
          Lugares
        </th>
        <th
          v-for="opcao in opcoesVoto"
          :key="opcao.valor"
          class="text-center text-xs md:text-md w-1/6 px-1 py-0 md:p-1"
        >
          {{ isMobile ? opcao.emoji : `${opcao.emoji} ${opcao.texto}` }}
        </th>
      </tr>
      <tr
        v-for="lugar in lugares"
        :key="lugar.nome"
      >
        <td class="text-xs md:text-md text-center md:text-right px-1 py-0">
          {{ lugar.texto }}
        </td>
        <td
          v-for="opcao in opcoesVoto"
          :key="opcao.valor"
          class="text-center px-1 py-0"
        >
          <input
            v-model="formularioDados[lugar.nome]"
            type="radio"
            :name="lugar.nome"
            :value="opcao.valor"
            class="md:h-5 md:w-5"
          >
        </td>
      </tr>
    </table>

    <div class="botoes">
      <a
        class="cursor-pointer border-r-2 pr-2 underline mt-2"
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