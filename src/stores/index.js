import * as React from "react"

import { useBoxStore } from "./box"
import { useSharedStore } from "./shared"
import { useCartStore } from "./cart"
import { useProductsStore } from "./products"

export const useStoreInitializers = () => {
  const cartStore = useCartStore()
  const productsStore = useProductsStore()

  React.useEffect(() => {
    cartStore.fetchCart()
  }, [])

  React.useEffect(() => {
    console.log("INIT PRODUCTS STORE")
    productsStore.fetchProducts()
  }, [])
}

export { useBoxStore }
export { useSharedStore }
export { useCartStore }
export { useProductsStore }
