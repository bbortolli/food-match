<script setup>
import { defineProps } from 'vue';

defineProps({
  headers: {
      type: Object,
      required: true
  },
  data: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="(text, key) in headers"
            :key="key"
          >
            {{ text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
        >
          <td
            v-for="(text, key) in headers"
            :key="key"
          >
            {{ row[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>