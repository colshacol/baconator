import * as React from "react"
import create from "zustand"

import products from "./products.json"

import { createStateSetter } from "../utilities/createStateSetter"
import * as shopifyApi from "../utilities/shopifyApi"

export const useShopifyStore = create((set, get) => {
  const setState = createStateSetter(set, get)
  const setIsFetchingProducts = setState("isFetchingProducts")
  const setIsFetchingCart = setState("isFetchingCart")
  const setIsUpdatingCart = setState("isUpdatingCart")
  const setIsEmptyingCart = setState("isEmptyingCart")
  const setProducts = setState("products")
  const setCart = setState("cart")

  const fetchProducts = async () => {
    setIsFetchingProducts(true)
    const response = products
    setProducts(response.products)
    setIsFetchingProducts(false)
  }

  const fetchCart = async () => {
    setIsFetchingCart(true)
    const response = {}
    setCart(response)
    setIsFetchingCart(false)
  }

  const updateCart = async (details) => {
    setIsUpdatingCart(true)
    setIsUpdatingCart(false)
  }

  const addToCart = async (products) => {
    setIsUpdatingCart(true)
    const response = await shopifyApi.addToCart()
    setIsUpdatingCart(false)
  }

  const emptyCart = async () => {
    setIsEmptyingCart(true)
    const response = await shopifyApi.emptyCart()
    setIsEmptyingCart(false)
  }

  return {
    products: [],
    cart: {},
    isFetchingProducts: false,
    isFetchingCart: false,
    isEmptyingCart: false,
    isUpdatingCart: false,
    fetchProducts,
    fetchCart,
    updateCart,
    addToCart,
    emptyCart,
  }
})
