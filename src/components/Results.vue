<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { traduzVoto, lugares } from '../const';
import MyTable from './MyTable.vue';
const store = useStore();

store.dispatch('getMatchHoje');

const matches = computed(() => {
  const ms = store.getters.getMatch;
  return ms ? Object.values(ms) : [];
});

function mapaVotos(matches) {
  const resultObject = {};
  matches.forEach((obj) => {
    resultObject[obj.apresenta] = obj.votes;
  });
  return resultObject;
}

const votesByEmail = computed(() => {
  const matchesVal = matches.value;
  return mapaVotos(matchesVal);
});

const emails = computed(() => {
  return Object.keys(votesByEmail.value);
});

const montaResultado = computed(() => {

  return lugares.map((lugar) => {
    const nome = lugar.nome;
    const soma = Object.values(votesByEmail.value).reduce((ac, curr) => ac + curr[nome], 0);
    const resultado = { ...lugar, soma };

    emails.value.forEach(e => {
      resultado[e] = votesByEmail.value[e][nome];
    });

    return resultado;
  });
});


const resultadoOrdenado = computed(() => {
  const key = 'soma';
  const ordenado = [...montaResultado.value].sort((a, b) => b[key] - a[key]);
  return ordenado.map(i => {
    const newMap = { ...i };
      emails.value.forEach(e => {
        newMap[e] = traduzVoto[i[e]];
    });
    return newMap;
  });
});

const cabecalho = computed(() => {
  const res = { texto: 'Local' };
  emails.value.forEach(e => {
    res[e] = e;
  });
  return res;
});

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div
      v-if="emails && emails.length <= 1"
      class="flex flex-col justify-center items-center"
    >
      <p>
        Aguardando todos os votos !!!
      </p>
    </div>
    <MyTable
      v-else
      :headers="cabecalho"
      :data="resultadoOrdenado"
    />
    <a
      class="cursor-pointer pl-2 underline mt-2"
      @click.prevent="$router.back()"
    >
      Voltar
    </a>
  </div>
</template>