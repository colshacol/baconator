import * as React from "react"
import create from "zustand"
import * as shopifyApi from "../utilities/shopifyApi"
import { useBoxStore } from "./box"
import removeOne from "remove-one"
import { useProductsStore } from "./products"
import count from "@extra-array/count"
import { devtools } from "zustand/middleware"

const findProductWithId = (allProducts, productId) => {
  return allProducts.find((product) => {
    return product.id === productId
  })
}

const findProuctVariantId = (product, isFirstProduct) => {
  console.log("findProuctVariantId", { product, isFirstProduct })
  for (const variant of product.variants) {
    if (isFirstProduct && variant.title === "50") {
      return variant.id
    }

    if (!isFirstProduct && variant.title === "30") {
      return variant.id
    }
  }
}

export const useCartStore = create((set, get) => {
  // TODO FIX ID FINDING
  const generateCartItems = (boxProducts) => {
    const allProducts = useProductsStore.getState().products
    const encounteredIds = []
    const cartItems = []

    for (const [index, boxProductId] of boxProducts.entries()) {
      if (!encounteredIds.includes(boxProductId)) {
        encounteredIds.push(boxProductId)
        const itemQuantity = count(boxProducts, (id) => id === boxProductId)
        const product = findProductWithId(allProducts, boxProductId)
        const variantId = findProuctVariantId(product, index === 0)
        cartItems.push({ id: variantId, quantity: itemQuantity })
      }
    }

    set({ cartItems })
  }

  const toggleIsCartOpen = (bool) => {
    const { isCartOpen, cartItems } = get()
    const value = typeof bool === "boolean" ? bool : !isCartOpen
    set({ isCartOpen: value })

    if (value) {
      addToCart(cartItems)
    }
  }

  const fetchCart = async () => {
    set({ isFetchingCart: true })
    const response = await shopifyApi.getCart()
    set({ cart: response })
    set({ isFetchingCart: false })
    return response
  }

  const updateCart = async (details) => {
    set({ isFetchingCart: true })
    const response = await shopifyApi.emptyCart()
    set({ isFetchingCart: false })
    return response
  }

  const addToCart = async (items) => {
    set({ isFetchingCart: true })
    const { cartItems } = get()
    await emptyCart()

    const response = await shopifyApi.addToCart(cartItems)
    console.log("got data here", { response })
    set({ isFetchingCart: false, cart: response })
    return response
  }

  const emptyCart = async () => {
    set({ cart: [] })
    const response = await shopifyApi.emptyCart()
    return response
  }

  useBoxStore.subscribe(generateCartItems, (state) => state.products)

  return {
    cart: {},
    cartItems: [],
    isCartOpen: false,
    toggleIsCartOpen,
    fetchCart,
    updateCart,
    addToCart,
    emptyCart,
  }
})
