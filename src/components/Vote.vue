<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const opcoesVoto = [
  { valor: 3, texto: '❤️ Amo, quero!' },
  { valor: 2, texto: '✅ Comeria' },
  { valor: 1, texto: '🆗 Ok' },
  { valor: 0, texto: '❌ Nem fodendo' }
];

const lugares = [
  { nome: 'ahoy', texto: '🍔 Ahoy' },
  { nome: 'mc', texto: '🍔 Mc Donalds' },
  { nome: 'lets', texto: '🍔 Let\'s Eat' },
  { nome: 'bk', texto: '🍔 Burger King' },
  { nome: 'saoGeraldo', texto: '🥟 São Geraldo' },
  { nome: 'charmosa', texto: '🍕 Charmosa' },
  { nome: 'massarosa', texto: '🍕 Massarosa' },
  { nome: 'laRosa', texto: '🍝 La Rosa' },
  { nome: 'coxinhasDouradas', texto: '🥐 Coxinha Dourada' },
  { nome: 'esquinaArabe', texto: '🥙 Esquina Árabe' },
  { nome: 'habibs', texto: '🥙 Habibs' },
  { nome: 'yakisoba', texto: '🍜 China in Box' },
  { nome: 'fondue', texto: '🍜 Fondue' },
  { nome: 'escondidinho', texto: '🍜 Escondidinho' }
];

const formularioDados = ref({});

async function enviarFormulario() {
  const dados = formularioDados.value;
  await store.dispatch('createMatch', dados);
  console.log(dados);
}

</script>

<template>
  <div>
    <table>
      <tr>
        <th>Lugares</th>
        <th
          v-for="opcao in opcoesVoto"
          :key="opcao.valor"
        >
          {{ opcao.texto }}
        </th>
      </tr>
      <tr
        v-for="lugar in lugares"
        :key="lugar.nome"
      >
        <td> {{ lugar.texto }} </td>
        <td
          v-for="opcao in opcoesVoto"
          :key="opcao.valor"
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
      <button
        class="btn"
        @click.prevent="enviarFormulario"
      >
        Enviar
      </button>
    </div>
  </div>
</template>

<style scoped>
.botoes {
  margin-top: 1.25em;
}
</style>
