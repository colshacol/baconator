import wretch from "wretch"
import { VARIANT_TITLE_30, VARIANT_TITLE_50 } from "../consts"

export const getVariantId = (productId, index) => {
  const match = window.pedersonsData.allProducts.find((product) => {
    return product.id == productId
  })

  const variantMatch = match.variants.find((variant) => {
    const titleMatch = index === 0 ? VARIANT_TITLE_50 : VARIANT_TITLE_30
    return variant.title === titleMatch
  })

  return variantMatch.id
}

export const getProducts = async () => {
  const endpoint = "/collections/subscribable-products/products.json"
  const response = await wretch(endpoint).get()

  return response.json(({ products }) => {
    return products
  })
}

export const getCollectionProducts = async (collectionHandle) => {
  const endpoint = `/collections/${collectionHandle}/products.json`
  const response = await wretch(endpoint).get()

  return response.json(({ products }) => {
    return products
  })
}

export const getCollections = async () => {
  const endpoint = "/collections.json"
  const response = await wretch(endpoint).get()

  return response.json(({ collections }) => {
    return collections
  })
}

export const addToCart = async (items) => {
  const response = await wretch("/cart/add.js").post({ items })

  return response.json((data) => {
    return data
  })
}

export const updateCart = async (items) => {
  // 35942808518821
  const updates = items.reduce((final, item) => {
    final[item.id] = item.quantity
    return final
  }, {})

  const response = await wretch("/cart/update.js").post({ updates })

  return response.json((data) => {
    return data
  })
}

export const emptyCart = async () => {
  const response = await wretch("/cart/clear.js").post()

  return response.json((data) => {
    return data
  })
}

window.emptyCart = emptyCart

export const getCart = async () => {
  const response = await wretch("/cart.js").get()

  return response.json((data) => {
    return data
  })
}
