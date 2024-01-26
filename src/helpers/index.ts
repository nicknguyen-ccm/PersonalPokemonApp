import type { Pokemon } from '@/composable/getPokemon'
import axios from 'axios'
export const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

export const APIURL = 'https://pokeapi.co/api/v2/pokemon/'
export const MAX_POKEMON = 1302
export const sizeOptions = [
  { name: '25', val: 25 },
  { name: '50', val: 50 },
  { name: '100', val: 100 },
  { name: 'ALL', val: MAX_POKEMON }
]

export const getPageNumber = (): number => {
  const pageNumber = localStorage.getItem('pageNumber')
  if (pageNumber === null) {
    return 1
  } else {
    return parseInt(pageNumber)
  }
}

export const setPageNumber = (pageNumber: number) => {
  localStorage.setItem('pageNumber', String(pageNumber))
}

export const getPagination = (): { name: string; val: number } => {
  const pagination = localStorage.getItem('pagination')
  if (pagination === null) {
    return { name: '25', val: 25 }
  } else {
    return JSON.parse(pagination)
  }
}

export const setPagination = (pagination: { name: string; val: number }) => {
  localStorage.setItem('pagination', JSON.stringify(pagination))
}

export const getFavorites = (): Set<number> => {
  const favorites = localStorage.getItem('pokemonFavorites')
  if (favorites === null) {
    return new Set([])
  } else {
    return new Set([...JSON.parse(favorites)])
  }
}

export const setFavorites = (pokemonFavorites: Set<number>) => {
  localStorage.setItem('pokemonFavorites', JSON.stringify([...pokemonFavorites]))
}

export const getNextPage = (id: number): string => {
  if (id === 1025) {
    return '/pokemon/10001'
  } else if (id === 10277) {
    return '/pokemon/1'
  } else {
    return `/pokemon/${id + 1}`
  }
}
export const getPrevPage = (id: number): string => {
  if (id === 10001) {
    return '/pokemon/1025'
  } else if (id === 1) {
    return '/pokemon/10277'
  } else {
    return `/pokemon/${id - 1}`
  }
}

export const getAllPokemon = async (): Promise<Pokemon[]> => {
  const result = await axios.get(APIURL + '?limit=' + MAX_POKEMON)

  // reformat data to fit pokemon data type
  return result.data.results.map((item) => {
    const parsedUrl = item.url.split('/')
    item.id = Number(parsedUrl[parsedUrl.length - 2])
    item.imageUrl = imageUrl + item.id + '.png'
    return item
  })
}
