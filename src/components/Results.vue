<script setup>
import { useStore } from 'vuex';
const store = useStore();

store.dispatch('getMatchHoje');
</script>

<template>
  <div>
    Results
  </div>
</template>