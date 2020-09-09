import { createContextStore, action, thunk, computed, debug } from "easy-peasy"
import removeOne from "remove-one"
import kindOf from "kind-of"
import * as shopifyApi from "./src/utilities/shopifyApi"
import count from "@extra-array/count"

const filterBy = (key) => (list) => (value) => {
  return list.filter((item) => item[key] === value)
}

const findBy = (key) => (list) => (value) => {
  return list.find((item) => item[key] === value)
}

const findById = findBy("id")
const filterById = filterBy("id")
const filterByTitle = filterBy("title")

const fetchProducts = thunk(async (actions, payload) => {
  actions.toggleIsFetchingProducts(true)
  const products = await shopifyApi.getProducts()
  actions.setAllProducts(products)
  actions.toggleIsFetchingProducts(false)
})

const fetchCart = thunk(async (actions, payload) => {
  actions.toggleIsFetchingCart(true)
  const cart = await shopifyApi.getCart()
  actions.setCart(cart)
  actions.toggleIsFetchingCart(false)
})

const emptyCart = thunk(async (actions, payload) => {
  const cart = await shopifyApi.emptyCart()
  actions.setCart(cart)
})

const updateCart = thunk(async (actions, payload, { getState }) => {
  await actions.emptyCart()
  const { cartItems } = getState()
  console.log({ cartItems })
  const cart = await shopifyApi.updateCart(cartItems)
  actions.setCart(cart)
})

const setAllProducts = action((state, products) => {
  state.allProducts = products
})

const setCart = action((state, cart) => {
  state.cart = cart
})

const isBoxFull = computed(
  [(state) => state.selectedProductIds],

  (selectedProductIds) => {
    return selectedProductIds.length === 6
  }
)

const isBoxEmpty = computed(
  [(state) => state.selectedProductIds],

  (selectedProductIds) => {
    return selectedProductIds.length === 0
  }
)

const selectedProductCount = computed(
  [(state) => state.selectedProductIds],

  (selectedProductIds) => {
    return selectedProductIds.length
  }
)

const selectedProducts = computed(
  [(state) => state.selectedProductIds, (state) => state.allProducts],

  (selectedProductIds, allProducts) => {
    const filter = findById(allProducts)
    return selectedProductIds.map(filter)
  }
)

const selectedProductVariantIds = computed(
  [(state) => state.selectedProducts],

  (selectedProducts) => {
    return selectedProducts.map((product, index) => {
      const variantTitle = index > 0 ? "30" : "50"
      console.log(product)

      return product.variants.reduce((final, variant) => {
        return variant.title === variantTitle ? variant.id : final
      }, 0)
    })
  }
)

const cartListItems = computed(
  [(state) => state.selectedProducts],

  (selectedProducts) => {
    const consolidatedProducts = selectedProducts.reduce((final, item) => {
      if (final[item.title]) {
        final[item.title].push(item)
        return final
      }

      final[item.title] = [item]
      final[item.title].itemId = item.id
      return final
    }, {})

    return Object.entries(consolidatedProducts).reduce((final, [title, products]) => {
      final.push({
        title,
        quantity: products.length,
        id: products.itemId,
      })

      return final
    }, [])
  }
)

const cartPrice = computed([(state) => state.cart], (cart) => {
  const price = cart.total_price / 100
  console.log("CART PRICE", cart, price)
  return price || 0
})

const cartItems = computed(
  [(state) => state.selectedProductVariantIds],

  (selectedProductVariantIds) => {
    return selectedProductVariantIds.reduce((final, id) => {
      const existing = final.find((item) => item.id === id)

      if (existing) {
        existing.quantity++
        return final
      }

      final.push({
        id,
        quantity: 1,
      })

      return final
    }, [])
  }
)

const toggleAction = (stateKey) => {
  return action((state, arg) => {
    const oldValue = state[stateKey]
    const isArgBoolean = kindOf(arg) === "boolean"
    state[stateKey] = isArgBoolean ? arg : !oldValue
  })
}

const toggleIsFetchingProducts = toggleAction("isFetchingProducts")
const toggleIsFetchingCart = toggleAction("isFetchingCart")
const toggleIsSideCartOpen = toggleAction("isSideCartOpen")
const toggleIsSideNavOpen = toggleAction("isSideNavOpen")
const toggleIsQuickViewOpen = toggleAction("isQuickViewOpen")

const addProductToBox = action((state, id) => {
  state.selectedProductIds.push(id)
})

const removeProductFromBox = action((state, id) => {
  state.selectedProductIds = removeOne(state.selectedProductIds, (pid) => pid === id)
})

const removeProductsFromBox = action((state, id) => {
  state.selectedProductIds = state.selectedProductIds.filter((pid) => {
    return pid !== id
  })
})

const setProductListFilter = action((state, filter) => {
  const current = state.productListFilter
  state.productListFilter = current === filter ? "" : filter
})

export const Store = createContextStore({
  cart: {},
  allProducts: window.pedersonsData.allProducts,
  subscribableProducts: window.pedersonsData.subscribableProducts,
  productListFilter: "",
  selectedProductIds: [],
  isFetchingProducts: false,
  isFetchingCart: false,
  isSideCartOpen: false,
  isSideNavOpen: false,
  isQuickViewOpen: false,

  setProductListFilter,
  toggleIsFetchingProducts,
  toggleIsFetchingCart,
  toggleIsSideCartOpen,
  toggleIsSideNavOpen,
  toggleIsQuickViewOpen,
  addProductToBox,
  removeProductFromBox,
  removeProductsFromBox,
  cartItems,
  cartPrice,
  selectedProducts,
  selectedProductCount,
  selectedProductVariantIds,
  isBoxFull,
  isBoxEmpty,
  cartListItems,
  fetchProducts,
  fetchCart,
  setAllProducts,
  setCart,
  emptyCart,
  updateCart,
})
