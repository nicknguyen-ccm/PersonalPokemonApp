<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Pokemon } from '@/composable/getPokemon'
import Button from 'primevue/button'
const router = useRouter()
const props = defineProps<{
  pokemon: Pokemon
  isLiked: boolean
}>()
const emit = defineEmits(['onLike'])
const heart = computed(() => (props.isLiked ? 'pi pi-heart-fill' : 'pi pi-heart'))
const detailHandler = () => {
  router.push(`/pokemon/${props.pokemon.id}`)
}
</script>

<template>
  <div class="card">
    <h1>{{ pokemon.name }}</h1>
    {{ pokemon.id }}
    <img :src="pokemon.imageUrl" />
    <i @click="emit('onLike', pokemon.id)" :class="heart" style="font-size: 2rem"></i>
    <Button @click="detailHandler">Details</Button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 40px;
}
</style>
