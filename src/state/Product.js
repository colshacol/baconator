import { types } from "mobx-state-tree"
import { VARIANT_TITLE_30 } from "../consts"
import { stringArray, uidType } from "./customTypes"
import { ProductMedia } from "./ProductMedia"
import { Variant } from "./Variant"
// import { ProductMedia } from './ProductMedia'
import { VARIANT_TITLE_50 } from "./../consts"

const DEFAULT_METAFIELDS = {
  from_price: "",
  in_stores_only: 0,
  ingredients: "",
  packaging_color: "",
  quantity_weight_and_pricing: "",
  quantity: "",
  weight: "",
}

const model = {
  available: types.boolean,
  compare_at_price_max: types.number,
  compare_at_price_min: types.number,
  compare_at_price_varies: types.boolean,
  compare_at_price: types.maybeNull(types.number),
  content: types.string,
  created_at: types.string,
  description: types.string,
  featured_image: types.string,
  handle: types.string,
  id: types.identifier,
  images: stringArray(),
  media: types.array(ProductMedia),
  metaFields: types.frozen(DEFAULT_METAFIELDS),
  options: stringArray(),
  price_max: types.number,
  price_min: types.number,
  price_varies: types.boolean,
  price: types.number,
  published_at: types.string,
  tags: stringArray(),
  title: types.string,
  type: types.string,
  variants: types.optional(types.array(Variant), []),
  vendor: types.string,
}

const actions = (self) => {
  return {
    afterCreate() {
      console.log("created Product")
    },
  }
}

const views = (self) => {
  return {
    get firstProductVariant() {
      return self.variants.find((variant) => {
        return variant.title === VARIANT_TITLE_50
      })
    },

    get subsequentProductVariant() {
      return self.variants.find((variant) => {
        return variant.title === VARIANT_TITLE_30
      })
    },
  }
}

export const Product = types.model(model).actions(actions).views(views)
