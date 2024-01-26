<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const searchQuery = ref('')
const emit = defineEmits(['submitSearch'])
</script>

<template>
  <div>
    <InputText v-model="searchQuery"></InputText>
    <Button @click="emit('submitSearch', searchQuery)">Search</Button>
  </div>
</template>
