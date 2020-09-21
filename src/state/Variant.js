import { types } from "mobx-state-tree"
import { uidType } from "./customTypes"
import { ProductMedia } from "./ProductMedia"
import { stringArray } from "./customTypes"

const model = {
  available: types.boolean,
  compare_at_price: types.maybeNull(types.string),
  compare_at_price: types.maybeNull(types.number),
  featured_image: types.maybeNull(types.string),
  id: types.number,
  inventory_management: types.string,
  name: types.string,
  option1: types.string,
  option2: types.maybeNull(types.string),
  option3: types.maybeNull(types.string),
  options: stringArray(),
  price: types.number,
  public_title: types.string,
  requires_shipping: types.boolean,
  sku: types.string,
  taxable: types.boolean,
  title: types.string,
  weight: types.number,
}

const actions = (self) => {
  return {
    afterCreate() {},
  }
}

const views = (self) => {
  return {}
}

export const Variant = types.model(model).actions(actions).views(views)
