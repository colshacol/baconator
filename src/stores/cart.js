import * as React from "react"
import create from "zustand"
import * as shopifyApi from "../utilities/shopifyApi"
import { useBoxStore } from "./box"
import removeOne from "remove-one"
import { useProductsStore } from "./products"
import count from "@extra-array/count"
import { VARIANT_TITLE_30, VARIANT_TITLE_50 } from "./../consts"

const findProductWithId = (allProducts, productId) => {
  return allProducts.find((product) => {
    return product.id === productId
  })
}

const findProductVariantId = (product, isFirstProduct) => {
  console.log("findProductVariantId", { product, isFirstProduct })
  for (const variant of product.variants) {
    if (isFirstProduct && variant.title === VARIANT_TITLE_50) {
      return variant.id
    }

    if (!isFirstProduct && variant.title === VARIANT_TITLE_30) {
      return variant.id
    }
  }
}

export const useCartStore = create((set, get) => {
  const generateCartItems = (boxProducts) => {
    const allProducts = useProductsStore.getState().products
    const cartItems = []

    for (const [index, boxProductId] of boxProducts.entries()) {
      const isFirstProduct = index === 0
      const product = findProductWithId(allProducts, boxProductId)
      const variantId = findProductVariantId(product, isFirstProduct)
      cartItems.push({ id: variantId, quantity: 1 })
    }

    set({ cartItems })
  }

  const toggleIsCartOpen = (bool) => {
    const { isCartOpen, cartItems } = get()
    const value = typeof bool === "boolean" ? bool : !isCartOpen
    set({ isCartOpen: value })

    if (value) {
      addToCart()
    }
  }

  const fetchCart = async () => {
    set({ isFetchingCart: true })
    const response = await shopifyApi.getCart()
    set({ cart: response })
    set({ isFetchingCart: false })
    return response
  }

  const updateCart = async () => {
    set({ isFetchingCart: true })
    const response = await shopifyApi.emptyCart()
    set({ isFetchingCart: false })
    return response
  }

  const addToCart = async () => {
    set({ isFetchingCart: true })
    const { cartItems } = get()
    await emptyCart()
    await shopifyApi.addToCart(cartItems)
    const cartResponse = await shopifyApi.getCart()
    set({ isFetchingCart: false, cart: cartResponse })
  }

  const emptyCart = async () => {
    const response = await shopifyApi.emptyCart()
    set({ cart: response })
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
