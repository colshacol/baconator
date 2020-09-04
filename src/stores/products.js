import * as React from "react"
import create from "zustand"
import * as shopifyApi from "../utilities/shopifyApi"

export const useProductsStore = create((set, get) => {
  const fetchProducts = async () => {
    set({ isFetchingProducts: true })
    const response = await shopifyApi.getProducts()
    set({ products: response })
    set({ isFetchingProducts: false })
  }

  const getProductById = (id) => {
    return get().products.find((product) => {
      return product.id === Number(id)
    })
  }

  const toggleFilter = (filter) => {
    set((state) => {
      const value = state.filter === filter ? "" : filter
      return { filter: value }
    })
  }

  return {
    products: [],
    isFetchingProducts: false,
    fetchProducts,
    getProductById,
    filter: "",
    toggleFilter,
  }
})
