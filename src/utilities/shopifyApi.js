import wretch from "wretch"

export const getVariantId = (productId, index) => {
  const match = window.pedersonsData.allProducts.find((product) => {
    return product.id == productId
  })

  const variantMatch = match.variants.find((variant) => {
    const titleMatch = index === 0 ? "50" : "30"
    return variant.title === titleMatch
  })

  return variantMatch.id
}

export const getProducts = async () => {
  const endpoint = "/collections/subscribable-products/products.json"
  const response = await wretch(endpoint).get()

  return response.json(({ products }) => {
    console.log("shopifyApi.getProducts", products)
    return products
  })
}

export const addToCart = async (items) => {
  const response = await wretch("/cart/add.js").post({ items })

  return response.json((data) => {
    console.log("shopifyApi.addToCart", data)
    return data
  })
}

export const updateCart = async () => {
  // 35942808518821
  const response = await wretch("/cart.js").get()

  return response.json((data) => {
    console.log("shopifyApi.updateCart", data)
    return data
  })
}

export const emptyCart = async () => {
  const response = await wretch("/cart/clear.js").post()

  return response.json((data) => {
    console.log("shopifyApi.emptyCart", data)
    return data
  })
}

export const getCart = async () => {
  const response = await wretch("/cart.js").get()

  return response.json((data) => {
    console.log("shopifyApi.getCart", data)
    return data
  })
}
