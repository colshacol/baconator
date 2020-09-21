import count from "@extra-array/count"
import * as React from "react"
import { QueryCache, ReactQueryCacheProvider, useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query-devtools"
import { VARIANT_TITLE_30, VARIANT_TITLE_50 } from "./consts"
import { fetch } from "./fetch"

const { pnf } = window
export const queryCache = new QueryCache({})

// Consts
//
//

const SUBSCRIPTION_PROPERTIES = {
  shipping_interval_frequency: "1",
  shipping_interval_unit_type: "Month",
}

// Utilities
//
//

export const doesCartHaveProductId = (productId) => {
  const cartItemsWithProductId = getCartItemsWithProductId(productId)
  return !!cartItemsWithProductId.length
}

export const getCartItemsWithProductId = (productId) => {
  const cart = getCartCache()
  const { cartInfo } = cart
  return cart ? cart.items.filter((item) => item.product_id === productId) : []
}

export const getCartProductQuantity = (productId) => {
  const cartItems = getCartItemsWithProductId(productId)

  return cartItems.reduce((final, item) => {
    final += item.quantity
    return final
  }, 0)
}

const getCartHelpers = (cart, cartInfo) => {
  return {
    doesCartHaveProductId,
    getCartItemsWithProductId,
    getCartProductQuantity,
    decrementCartProductQuantity,
    incrementCartProductQuantity,
    addProductToCart,
    removeProductFromCart,
  }
}

const getCartInfo = (cart) => {
  if (cart) {
    const productCount = getCartItemsCount(cart)
    const nextAddVariantTitle = productCount ? VARIANT_TITLE_30 : VARIANT_TITLE_50
    const variantIds = cart.items.map((item) => item.id)
    const productIds = cart.items.map((item) => item.product_id)

    const cartItems = cart.items.reduce((final, item) => {
      if (final[item.product_id]) {
        final[item.product_id].quantity++
        return final
      }

      final[item.product_id] = {
        quantity: item.quantity,
        title: item.title,
        productId: item.product_id,
      }

      return final
    }, {})

    return {
      cartItems,
      productCount,
      variantIds,
      productIds,
      nextAddVariantTitle,
    }
  }

  return {}
}

const getCartCache = () => {
  const cart = queryCache.getQueryData("cart")
  cart.cartInfo = getCartInfo(cart)

  return cart
}

const getVariantId = (product, variantTitle) => {
  return product.variants.reduce((final, variant) => {
    return variant.title == variantTitle ? variant.id : final
  }, "")
}

const getVariantByTitle = (product, variantTitle) => {
  return product.variants.find((variant) => variant.title == variantTitle)
}

const getCartItemsCount = (cart) => {
  return cart.items.reduce((final, item) => {
    final = final + item.quantity
    return final
  }, 0)
}

const getProductVariantIds = (product) => {
  return product.variants.reduce((final, variant) => {
    final[variant.title] = variant.id
    return final
  }, {})
}

const getCartItemByVariantTitleAndId = (cart, variantTitle, id) => {
  return cart.items.find((item) => {
    return item.variant_title == variantTitle && item.product_id === id
  })
}

const countMatches = (targetList, value) => {
  return count(targetList, (item) => item == value)
}

// Logic
//
//

const fetchCart = async () => {
  const [data, error] = await fetch.get("/cart.js")
  return data
}

export const useCart = () => {
  const cart = useQuery("cart", fetchCart, {
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: pnf.cart,
  })

  cart.cartInfo = getCartInfo(cart.data)
  cart.actions = getCartHelpers()
  return cart
}

export const addProductToCart = async (product) => {
  // TODO: Handle errors.
  const cart = getCartCache()

  const quantity = 1
  const properties = SUBSCRIPTION_PROPERTIES
  const variant30 = product.variant30
  const variant50 = product.variant50

  const variant = cart.cartInfo.productCount ? variant30 : variant50

  const items = [{ id: variant.id, quantity, properties }]
  await fetch.post("/cart/add.js", { items })
  return queryCache.invalidateQueries("cart")
}

export const removeProductFromCart = async (product) => {
  const cart = getCartCache()
  const { cartInfo } = cart

  const variant30 = product.variant30
  const variant50 = product.variant50
  const xxx = cart.items.find((item) => item.id === variant30.id)
  const yyy = cart.items.find((item) => item.id === variant50.id)

  if (cartInfo.productIds.length === 1) {
    const clearResponse = await fetch.post("/cart/clear.js")
    return queryCache.invalidateQueries("cart")
  }

  const newProductIds = cartInfo.productIds.filter((id) => id !== product.id)
  const items = generateCartItemsFromProductIds(newProductIds)
  const clearResponse = await fetch.post("/cart/clear.js")
  const [data, error] = await fetch.post("/cart/add.js", { items })
  return queryCache.invalidateQueries("cart")
}

const generateCartItem = (product, quantity, index) => {
  const id = getVariantId(product, index ? VARIANT_TITLE_30 : VARIANT_TITLE_50)
  const properties = SUBSCRIPTION_PROPERTIES

  return {
    id,
    quantity,
    properties,
  }
}

const generateCartItemsFromProductIds = (productIds) => {
  const [firstProductId, ...otherProductIds] = productIds

  const quantities = otherProductIds.reduce((final, id) => {
    if (final[id]) {
      final[id] += 1
      return final
    }

    final[id] = 1
    return final
  }, {})

  const [firstProduct, ...otherProducts] = productIds.map(products.getById)
  const uniqueOtherProducts = Array.from(new Set(otherProducts))

  const firstCartItem = generateCartItem(firstProduct, 1, 0)
  const otherCartItems = uniqueOtherProducts.map((item, index) =>
    generateCartItem(item, quantities[item.id], index)
  )

  return [firstCartItem, ...otherCartItems]
}

export const decrementCartProductQuantity = async (product) => {
  const cart = getCartCache()
  const { cartInfo } = cart
  const performMutation = () => queryCache.invalidateQueries("cart")

  // If there is one or less products in the cart then it must be
  // this product we are trying to decrement, so we just need to
  // empty the cart and invalidate the cache.
  if (cartInfo.productCount <= 1) {
    await fetch.post("/cart/clear.js")
    return performMutation()
  }

  const variant30 = product.variant30
  const variant50 = product.variant50
  const item30 = cart.items.find((item) => item.id === variant30.id)
  const item50 = cart.items.find((item) => item.id === variant50.id)

  // If this product's 30 variant is in the cart, decrement the quantity for
  // the 30 variant and invalidate the cache.
  if (item30) {
    const updates = { [variant30.id]: item30.quantity - 1 }
    const [data, error] = await fetch.post("/cart/update.js", { updates })
    return performMutation()
  }

  // If this product's 50 variant is in the cart, we need to empty the cart,
  // generate a brand new list of cart items (excluding this product), add
  // all of the newly generated cart items to the cart in 1 API call, and then
  // invalidate the cache. (Re-generating the cart items will ensure that a
  // different product will assume the responsibility of being the required 50 variant.)
  if (item50) {
    const newProductIds = cartInfo.productIds.filter((id) => id !== product.id)
    const items = generateCartItemsFromProductIds(newProductIds)
    const clearResponse = await fetch.post("/cart/clear.js")
    const [data, error] = await fetch.post("/cart/add.js", { items })

    return performMutation()
  }
}

export const incrementCartProductQuantity = async (product) => {
  const cart = getCartCache()
  const { cartInfo } = cart
  const variant = product.variant30
  const properties = SUBSCRIPTION_PROPERTIES
  const id = variant.id

  const oldQuantity = cart.items.reduce((final, item) => {
    return item.id === id ? final + item.quantity : final
  }, 0)

  // If quantity is 0, this is the first of this variant to be
  // added to the cart, so we need to use the /cart/add api
  // and then invalidate the cart query.
  if (!oldQuantity) {
    const items = [{ id, quantity: 1, properties }]
    const [data, error] = await fetch.post("/cart/add.js", { items })
    queryCache.invalidateQueries("cart")
    return { data, error }
  }

  // If quantity is more than 1, we need to use the /cart/update
  // api to update the quantity instead of add.
  const updates = { [id]: oldQuantity + 1 }
  const [data, error] = await fetch.post("/cart/update.js", { updates })
  queryCache.invalidateQueries("cart")
  return { data, error }
}

export const QueryCacheProvider = (props) => {
  return <ReactQueryCacheProvider queryCache={queryCache}>{props.children}</ReactQueryCacheProvider>
}

// Devtools
//
//

export const RQDevtools = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return <ReactQueryDevtools initialIsOpen={false} />
}

// Other
//
//

const createMethods = (list) => {
  const getById = (id) => {
    return list.find((item) => item.id == id)
  }

  const getByTitle = (title) => {
    return list.find((item) => item.title == title)
  }

  const getByHandle = (handle) => {
    return list.find((item) => item.handle == handle)
  }

  return {
    getById,
    getByTitle,
    getByHandle,
  }
}

const enhanceProducts = (products) => {
  return products.map((product) => {
    if (product.variants.length === 1) return product
    const variant30 = getVariantByTitle(product, VARIANT_TITLE_30)
    const variant50 = getVariantByTitle(product, VARIANT_TITLE_50)

    variant30.isOutOfStock = variant30.inventory_quantity < 1
    variant50.isOutOfStock = variant50.inventory_quantity < 1

    const isOutOfStock = variant30.isOutOfStock || variant50.isOutOfStock

    product.variant30 = variant30
    product.variant50 = variant50
    product.isOutOfStock = isOutOfStock
    return product
  })
}

export const products = (() => {
  const list = enhanceProducts(pnf.allProducts)
  const methods = createMethods(list)

  const getProductWithVariantId = (variantId) => {
    return list.find((product) => {
      const variantIds = product.variants.map((variant) => variant.id)
      return variantIds.includes(variantId)
    })
  }

  return {
    list,
    ...methods,
    getProductWithVariantId,
  }
})()

export const collections = (() => {
  const list = pnf.allCollections
  const methods = createMethods(list)

  return {
    list,
    ...methods,
  }
})()
