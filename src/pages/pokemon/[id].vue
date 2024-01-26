<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getPokemon } from '../../composable/getPokemon'
import { APIURL, getNextPage, getPrevPage } from '../../helpers/index'
import { onMounted, ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import Carousel from 'primevue/carousel'
import Panel from 'primevue/panel'
const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const url = ref('')
const pokemon = getPokemon(url)
const sprites = ref()

const handlePrevious = () => {
  router.push(getPrevPage(parseInt(id)))
}
const handleNext = () => {
  router.push(getNextPage(parseInt(id)))
}
watch(pokemon, () => {
  sprites.value = Object.values(pokemon?.value[0].sprites).filter(
    (item) => typeof item === 'string'
  )
})
onMounted(() => {
  url.value = APIURL + id

  //sprites.value = Object.values(pokemon.value.sprites).filter((item) => typeof item === 'string')
})
</script>
<template>
  <Carousel :value="sprites" :numVisible="2" circular :autoplay-interval="3000">
    <template #item="sprite">
      <div><img :src="sprite.data" /></div>
    </template>
  </Carousel>
  <div v-if="pokemon[0]">
    <p>Name: {{ pokemon[0].name }}</p>
    <p>Id: {{ pokemon[0].id }}</p>
    <Panel header="Types" :collapsed="true" toggleable>
      <p v-for="type in pokemon[0].types" :key="type.type.name">{{ type.type.name }}</p>
    </Panel>
    <Panel header="Abilities" :collapsed="true" toggleable
      ><p v-for="ability in pokemon[0].abilities" :key="ability.ability.name">
        {{ ability.ability.name }}
      </p>
    </Panel>
  </div>

  <div>
    <Button @click="handlePrevious">Previous</Button>
    <Button @click="handleNext">Next</Button>
  </div>
</template>
