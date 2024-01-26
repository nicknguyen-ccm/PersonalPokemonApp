<script setup lang="ts">
import Pokedex from '@/components/Pokemon/Pokedex.vue'
import FavoritePokemon from '@/components/Pokemon/FavoritePokemon.vue'
import SearchBar from '@/components/SearchBar.vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { getPokemon } from '@/composable/getPokemon'
import type { Pokemon } from '../composable/getPokemon'
import { APIURL, getFavorites, setFavorites, getAllPokemon } from '../helpers/index'
import { getPagination, setPagination, getPageNumber, setPageNumber } from '../helpers/index'

const searchQuery = ref('')
const pageNumber = ref(1) // dummy values for change on mount
const pagination = ref({ name: '1', val: 1 }) // dummy values for change on mount
const favorites = ref(new Set([-1])) // dummy values for change on mount
const offset = computed(() => (pageNumber.value - 1) * pagination.value.val)
const url = computed(() => {
  // if searchQuery empty return a list of pokemon else return one pokemon
  if (searchQuery.value == '') {
    // compute a new url based on page number and pagination size

    return APIURL + `?limit=${pagination.value.val}&offset=${offset.value}`
  } else {
    return APIURL + searchQuery.value
  }
})

const pokemon: Ref<Pokemon[]> = getPokemon(url) as Ref<Pokemon[]> // url not yet defined above the computed, get pokemon returns a ref

const allPokemon = ref<Pokemon[]>()
getAllPokemon().then((result) => (allPokemon.value = result))
const searchHandler = (searchText: string) => (searchQuery.value = searchText)

const paginationHandler = (searchPagination: { name: string; val: number }) => {
  pagination.value = searchPagination // might have to reset page number when pagination changes
  setPagination(pagination.value)
  pageNumber.value = 1
  setPageNumber(1)
}

const pageHandler = (pageChange: number) => {
  pageNumber.value = pageNumber.value + pageChange
  setPageNumber(pageNumber.value)
}
const toast = useToast()
const onLike = (id: number) => {
  if (favorites.value.has(Number(id))) {
    favorites.value.delete(Number(id))
    setFavorites(favorites.value)
    toast.add({
      severity: 'error',
      detail: 'Pokemon removed from favorites!',
      life: 2500
    })
  } else {
    favorites.value.add(Number(id))
    setFavorites(favorites.value)
    toast.add({
      severity: 'success',
      detail: 'Pokemon added to favorites!',
      life: 2500
    })
  }
}
onMounted(() => {
  pageNumber.value = getPageNumber()
  pagination.value = getPagination()
  favorites.value = getFavorites()
})
</script>

<template>
  <Toast position="top-right" />
  <SearchBar @submit-search="searchHandler"></SearchBar>
  <TabView>
    <TabPanel header="Pokedex">
      <Pokedex
        @onLike="onLike"
        @paginationChange="paginationHandler"
        @pageChange="pageHandler"
        :pokemon="pokemon"
        :pagination="pagination"
        :page="pageNumber"
        :favorites="favorites"
      ></Pokedex>
    </TabPanel>
    <TabPanel :header="'Favorites: ' + favorites.size" v-if="pokemon?.length > 2">
      <FavoritePokemon
        :pokemon="allPokemon"
        :favorites="favorites"
        @onLike="onLike"
      ></FavoritePokemon>
    </TabPanel>
  </TabView>
</template>
