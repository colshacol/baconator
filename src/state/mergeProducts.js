export const mergeProducts = (allProducts, products) => {
  // const allProducts = window.pedersonsData.allProducts

  return products.map((product) => {
    const _product = allProducts.find((item) => item.id === product.id)

    return {
      ...product,
      ..._product,
    }
  })
}
