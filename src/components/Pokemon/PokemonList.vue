<script setup lang="ts">
import type { Pokemon } from '@/composable/getPokemon'
import PokemonCard from './PokemonCard.vue'
const props = defineProps<{
  pokemon: Pokemon[]
  favorites: Set<number>
}>()
const emit = defineEmits(['onLike'])
</script>

<template>
  <div class="pokemon-list">
    <PokemonCard
      v-for="creature in pokemon"
      @onLike="(x) => emit('onLike', x)"
      :key="creature.id"
      :pokemon="creature"
      :isLiked="favorites.has(creature.id)"
    >
    </PokemonCard>
  </div>
</template>

<style scoped>
.pokemon-list {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
</style>
