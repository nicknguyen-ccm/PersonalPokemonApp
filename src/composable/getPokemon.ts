import axios from 'axios'
import { imageUrl } from '../helpers/index'
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{ID}.png
type possibleSprite = string | null
type sprites = {
  back_default: possibleSprite
  back_female: possibleSprite
  back_shiny: possibleSprite
  back_shiny_female: possibleSprite
  front_default: possibleSprite
  front_female: possibleSprite
  front_shiny: possibleSprite
  front_shiny_female: possibleSprite
}
export type Pokemon = {
  id: number
  name: string
  imageUrl: string
  sprites?: sprites
  types?: [{ slot: number; type: { name: string; url: string } }]
  abilities?: [{ ability: { name: string; url: string } }]
  // possibly add abilities and other things
}

export const getPokemon = (url: Ref<string>): Ref<Pokemon[] | null> => {
  const data = ref<Pokemon[] | null>([])

  // add an image url
  const fetchData = async (url: string) => {
    const result = await axios.get(url)
    if (result.data.results == undefined) {
      // only one pokemon is returned
      result.data.imageUrl = imageUrl + result.data.id + '.png'
      data.value = [result.data]
    } else {
      // reformat data to fit pokemon data type
      const reformattedData = result.data.results.map((item) => {
        const parsedUrl = item.url.split('/')
        item.id = Number(parsedUrl[parsedUrl.length - 2])
        item.imageUrl = imageUrl + item.id + '.png'
        return item
      })

      data.value = reformattedData
    }
  }
  watch(url, () => {
    if (url) {
      fetchData(url.value)
    }
  })

  return data
}
