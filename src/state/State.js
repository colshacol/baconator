import { optionalArray } from "assert-plus"
import { types } from "mobx-state-tree"
import { optionalArrayType } from "./customTypes"
import { Product } from "./Product"
import { Collection } from "./Collection"
import { uidType } from "./customTypes"
import { Cart } from "./Cart"

const model = {
  boxProductListFilter: types.optional(types.string, "All"),
  boxProductListSearchValue: types.optional(types.string, ""),
  products: optionalArrayType(Product),
  collections: optionalArrayType(Collection),
}

const volatile = (self) => {
  return {
    cart: {},
  }
}

const actions = (self) => {
  const setProducts = (products) => {
    self.products = products.map((product) => {
      product.id = String(product.id)
    })
  }

  const setCollections = (collections) => {
    self.collections = collections.map((collection) =>
      Collection.create({
        ...collection,
        id: String(collection.id),
      })
    )

    self.collections.forEach((collection) => {
      collection.populateProducts()
    })
  }

  const setCart = (cart) => {
    self.cart = cart
  }

  return {
    setProducts,
    setCollections,
    setCart,

    afterCreate() {
      console.log("created State")
    },
  }
}

const views = (self) => {
  return {
    get filteredBoxProducts() {
      return self.products
    },
  }
}

export const State = types.model(model).actions(actions).volatile(volatile).views(views)
