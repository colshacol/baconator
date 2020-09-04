import * as React from "react"
import create from "zustand"
import isEmpty from "is-empty"
import removeOne from "remove-one"
import count from "@extra-array/count"
import { useProductsStore } from "./products"
import { devtools } from "zustand/middleware"

export const useBoxStore = create((set, get) => {
  const addProduct = (id) => {
    if (isBoxFull()) return

    set((state) => {
      return {
        products: [...state.products, id],
      }
    })
  }

  const removeProduct = (id) => {
    set((state) => {
      return {
        products: state.isBoxEmpty()
          ? state.products
          : removeOne(state.products, (x) => x === id),
      }
    })
  }

  const getProductCount = (id) => {
    const state = get()
    return id ? count(state.products, (x) => x === id) : state.products.length
  }

  const hasProduct = (id) => {
    const state = get()
    return state.products.includes(id)
  }

  const isBoxEmpty = () => {
    return get().products.length === 0
  }

  const isBoxFull = () => {
    return get().products.length === 6
  }

  return {
    products: [],
    addProduct,
    removeProduct,
    getProductCount,
    hasProduct,
    isBoxEmpty,
    isBoxFull,
  }
})
