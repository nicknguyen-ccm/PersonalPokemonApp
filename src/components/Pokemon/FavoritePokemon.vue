<script setup lang="ts">
import type { Pokemon } from '../../composable/getPokemon'
import PokemonList from './PokemonList.vue'
const props = defineProps<{
  pokemon: Pokemon[] | undefined
  favorites: Set<number>
}>()
const emit = defineEmits(['onLike'])

const favoritePokemon = computed(() => {
  if (props.pokemon) {
    return props.pokemon.filter((creature) => {
      return props.favorites.has(creature.id)
    })
  } else {
    return []
  }
})
</script>

<template>
  <PokemonList
    :pokemon="favoritePokemon"
    :favorites="favorites"
    @onLike="
      (id) => {
        emit('onLike', id)
      }
    "
  ></PokemonList>
</template>
