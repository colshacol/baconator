import {
  persist,
  createContextStore,
  actionOn,
  action,
  thunk,
  computed,
  debug,
  thunkOn,
} from "easy-peasy"
import removeOne from "remove-one"
import kindOf from "kind-of"
import * as shopifyApi from "./src/utilities/shopifyApi"
import count from "@extra-array/count"
import { u } from "./src/utilities/u"
import { VARIANT_TITLE_30 } from "./src/consts"

const filterBy = (key) => (list) => (value) => {
  return list.filter((item) => item[key] === value)
}

const findBy = (key) => (list) => (value) => {
  return list.find((item) => item[key] === value)
}

const findById = findBy("id")

const fetchProducts = thunk(async (actions, payload) => {
  actions.toggleIsFetchingProducts(true)
  const products = await shopifyApi.getProducts()
  actions.setAllProducts(products)
  actions.toggleIsFetchingProducts(false)
})

const fetchCollectionProducts = thunk(async (actions, collectionHandle, { getState }) => {
  const products = await shopifyApi.getCollectionProducts(collectionHandle)
  const { allProducts } = getState()

  const final = products.map((product) => {
    return allProducts.find((item) => {
      return item.id === product.id
    })
  })

  actions.setFilteredProducts(final.filter(Boolean))
})

const setFilteredProducts = action((state, filteredProducts) => {
  state.filteredProducts = filteredProducts
})

const fetchCollections = thunk(async (actions, payload) => {
  const collections = await shopifyApi.getCollections()
  actions.setCollections(collections)
})

const setCollections = action((state, collections) => {
  state.collections = collections
})

const fetchCart = thunk(async (actions, payload) => {
  actions.toggleIsFetchingCart(true)
  const cart = await shopifyApi.getCart()
  actions.setCart(cart)
  actions.toggleIsFetchingCart(false)
})

const emptyCart = thunk(async (actions, payload) => {
  const cart = await shopifyApi.emptyCart()
  // actions.setCart(cart)
})

const setAllProducts = action((state, products) => {
  state.allProducts = products
})

const setCart = action((state, cart) => {
  state.cart = cart
})

const selectedProductIdsSelector = (state) => state.selectedProductIds

const isBoxFull = computed(
  [selectedProductIdsSelector],

  (selectedProductIds) => {
    return selectedProductIds.length === 9999
  }
)

const isBoxEmpty = computed(
  [selectedProductIdsSelector],

  (selectedProductIds) => {
    return selectedProductIds.length === 0
  }
)

const selectedProductCount = computed(
  [selectedProductIdsSelector],

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
      const variantTitle = index > 0 ? VARIANT_TITLE_30 : VARIANT_TITLE_50

      return product.variants.reduce((final, variant) => {
        return variant.title === variantTitle ? variant.id : final
      }, 0)
    })
  }
)

const cartPrice = computed([(state) => state.cart], (cart) => {
  const price = cart.total_price / 100
  return price || 0
})

// When selectedProductVariantIds changes,
// derive a new list of items to update cart.
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
        properties: {
          shipping_interval_frequency: "1",
          shipping_interval_unit_type: "Month",
        },
      })

      return final
    }, [])
  }
)

//
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

const toggleAction = (stateKey) => {
  return action((state, arg) => {
    const oldValue = state[stateKey]
    const isArgBoolean = kindOf(arg) === "boolean"
    state[stateKey] = isArgBoolean ? arg : !oldValue
  })
}

export const Store = createContextStore({
  auditLogs: [],
  allProducts: window.pnf.allProducts,
  subscribableProducts: window.pedersonsData.subscribableProducts,
  cart: {},
  collections: window.pnf.allCollections,
  filteredProducts: window.pedersonsData.subscribableProducts,
  filterSearchValue: "",
  productListFilter: "subscribable-products",
  quickViewProductId: "",
  selectedProductIds: [],
  isFetchingCart: false,
  isFetchingProducts: false,
  isQuickViewOpen: false,
  isSideCartOpen: false,
  isSideNavOpen: false,

  cartItems,
  cartListItems,
  cartPrice,
  emptyCart,
  fetchCart,
  fetchCollectionProducts,
  fetchCollections,
  fetchProducts,
  isBoxEmpty,
  isBoxFull,
  selectedProductCount,
  selectedProducts,
  selectedProductVariantIds,
  setAllProducts,
  setCart,
  setCollections,
  setFilteredProducts,

  toggleIsFetchingProducts: toggleAction("isFetchingProducts"),
  toggleIsFetchingCart: toggleAction("isFetchingCart"),
  toggleIsSideCartOpen: toggleAction("isSideCartOpen"),
  toggleIsSideNavOpen: toggleAction("isSideNavOpen"),
  toggleIsQuickViewOpen: toggleAction("isQuickViewOpen"),

  // initialize: thunk(async (actions, payload, { getState }) => {
  //   const cart = window.pnf.cart
  //   const productIds = u.array.reduceToValues(cart.items, "id")
  //   actions.hydrateSelectedProductIds(productIds)
  //   actions.setCart(cart)
  // }),

  // hydrateSelectedProductIds: action((state, ids) => {
  //   state.selectedProductIds = ids
  // }),

  quickViewProduct: computed(
    [(state) => state.quickViewProductId, (state) => state.allProducts],
    (id, allProducts) => {
      return allProducts.find((item) => item.id === id)
    }
  ),

  addProductToBox: action((state, id) => {
    state.selectedProductIds.push(id)
  }),

  removeProductFromBox: action((state, id) => {
    state.selectedProductIds = removeOne(state.selectedProductIds, (pid) => pid === id)
  }),

  removeProductsFromBox: action((state, id) => {
    state.selectedProductIds = state.selectedProductIds.filter((pid) => {
      return pid !== id
    })
  }),

  setFilterSearchValue: action((state, data) => {
    const _value = data.target ? data.target.value : data
    state.filterSearchValue = _value
  }),

  setProductListFilter: action((state, filter) => {
    state.productListFilter = filter
  }),

  setQuickViewProductId: action((state, productId) => {
    state.quickViewProductId = productId
  }),

  updateCart: thunk(async (actions, payload, { getState }) => {
    actions.toggleIsFetchingCart(true)
    await actions.emptyCart()
    const { cartItems } = getState()
    await shopifyApi.addToCart(cartItems)
    const cart = await shopifyApi.getCart()
    actions.setCart(cart)
    actions.toggleIsFetchingCart(false)
  }),

  // When a product is added to the box,
  // add a log to be displayed in <AuditLogs />.
  addProductToBoxLogger: actionOn(
    (actions) => actions.addProductToBox,
    (state, target) => {
      const product = u.array.findByKeyValue(state.allProducts, "id", target.payload, {})
      state.auditLogs.push(`Added a product: ${product.title}`)
    }
  ),

  cartLogger: actionOn(
    (actions) => actions.setCart,
    (state, target) => {
      state.auditLogs.push(`Set new cart value.`)
    }
  ),

  // When the product list filter changes, fetch the
  // corresponding collection.
  onSetProductListFilter: thunkOn(
    (actions) => actions.setProductListFilter,
    (actions, target) => {
      actions.fetchCollectionProducts(target.payload)
    }
  ),

  // When a product is added to the box,
  // update the cart.
  onAddProductToBox: thunkOn(
    (actions) => actions.addProductToBox,
    async (actions, target) => {
      // actions.updateCart()
    }
  ),
})
