import { types } from "mobx-state-tree"
import { uidType } from "./customTypes"

const model = {
  foo: types.optional(types.string, "bar"),
}

const actions = (self) => {
  return {
    afterCreate() {
      console.log("created Cart")
    },
  }
}

const views = (self) => {
  return {}
}

export const Cart = types.model(model).actions(actions).views(views)
