import * as React from "react"
import create from "zustand"
import { useBoxStore } from "./box"
import { useProductsStore } from "./products"

// const useSharedStore = () => {
//   const productsStore = useProductsStore((store) => store.products)
//   const boxStore = useBoxStore((store) => store.products)
//   console.log({ boxStore, productsStore })
// }

export const useSharedStore = create((set, get) => {
  const toggleIsCartOpen = (bool) => {
    set((state) => {
      const value = typeof bool === "boolean" ? bool : !state.isCartOpen
      return { isCartOpen: value }
    })
  }

  const toggleIsQuickViewOpen = (bool) => {
    set((state) => {
      const value = typeof bool === "boolean" ? bool : !state.isQuickViewOpen
      const product = { quickViewProduct: !!value ? state.product : undefined }
      return { isQuickViewOpen: value, ...product }
    })
  }

  const toggleIsSideNavOpen = (bool) => {
    set((state) => {
      const value = typeof bool === "boolean" ? bool : !state.isSideNavOpen
      return { isSideNavOpen: value }
    })
  }

  const openProductQuickView = (product) => {
    set({ isQuickViewOpen: true, quickViewProduct: product })
  }

  return {
    isCartOpen: false,
    isQuickViewOpen: false,
    isSideNavOpen: false,
    quickViewProduct: undefined,
    toggleIsCartOpen,
    toggleIsSideNavOpen,
    toggleIsQuickViewOpen,
    openProductQuickView,
  }
})
