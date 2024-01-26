<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { sizeOptions } from '@/helpers/index'
import type { Pokemon } from '@/composable/getPokemon'
const props = defineProps<{
  pokemon: Pokemon[]
  pagination: { name: string; val: number }
  page: number
  favorites: Set<number>
}>()

const emit = defineEmits(['pageChange', 'paginationChange', 'onLike'])
const pokemonPagination = ref({ name: props.pagination.name, val: props.pagination.val })
const isSearchedPokemon = computed(() => {
  if (props.pokemon) {
    return props.pokemon.length !== 1
  }
})

const disableButtons = computed(() => {
  if (props.pagination) {
    return props.pagination.name !== 'ALL'
  }
})

const addAllHandler = () => {
  props.pokemon.forEach((creature) => {
    if (!props.favorites.has(creature.id)) {
      emit('onLike', creature.id)
    }
  })
}

onMounted(() => {
  pokemonPagination.value = { name: props.pagination.name, val: props.pagination.val }
})
</script>

<template>
  <Dropdown
    v-if="isSearchedPokemon"
    @change="emit('paginationChange', pokemonPagination)"
    v-model="pokemonPagination"
    optionLabel="name"
    :options="sizeOptions"
    placeholder="Select a Size"
  ></Dropdown>

  <PokemonList
    :pokemon="pokemon"
    :favorites="favorites"
    @onLike="
      (id) => {
        emit('onLike', id)
      }
    "
  ></PokemonList>
  <div v-if="isSearchedPokemon && disableButtons">
    <Button @click="addAllHandler">Add all to Favorites</Button><br />
    <Button :disabled="page < 2" @click="emit('pageChange', -1)"> Prev </Button>
    <p>Page Number: {{ page }}</p>
    <Button @click="emit('pageChange', 1)"> Next </Button>
  </div>
</template>
// todo: check for next button disabled if pagination goes to far
