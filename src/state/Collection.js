import { types, getParent } from "mobx-state-tree"
import { uidType } from "./customTypes"
import { Product } from "./Product"
// import { mergeProducts } from "./mergeProducts"
import * as shopifyApi from "../utilities/shopifyApi"
import { appState } from "./"

const DEFAULT_RULE = {
  column: "",
  relation: "",
  condition: "",
}

export const DEMO_MODEL = {
  id: 0,
  handle: "",
  title: "",
  updated_at: "",
  body_html: "",
  published_at: "",
  sort_order: "",
  template_suffix: "",
  disjunctive: false,
  rules: [DEFAULT_RULE],
  published_scope: "",
}

const model = {
  id: types.identifier,
  handle: types.string,
  title: types.string,
  updated_at: types.string,
  body_html: types.maybeNull(types.string),
  published_at: types.string,
  sort_order: types.string,
  template_suffix: types.string,
  disjunctive: types.maybe(types.boolean, types.undefined),
  rules: types.array(types.frozen(DEFAULT_RULE)),
  published_scope: types.string,
  products: types.optional(types.array(types.reference(Product)), []),
}

const actions = (self) => {
  const setProducts = (products) => {
    products.forEach((product) => {
      self.products.push(product)
    })
  }

  const populateProducts = () => {
    shopifyApi.getCollectionProducts(self.handle).then((products) => {
      const newProducts = products.map((product) => {
        return appState.products.find((_product) => {
          return _product.id === product.id
        })
      })

      console.log({ newProducts })
      self.setProducts(newProducts)
    })
  }

  return {
    setProducts,
    populateProducts,
    afterCreate() {
      console.log("created Collection")
    },
  }
}

const views = (self) => {
  return {
    get productsJsonUrl() {
      return `/collections/${self.handle}/products.json`
    },

    get productsJsonUrl() {
      return `/collections/${self.handle}.json`
    },
  }
}

export const Collection = types.model(model).actions(actions).views(views)
