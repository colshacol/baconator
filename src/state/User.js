import { types } from "mobx-state-tree"
import { uidType } from "./customTypes"

const model = {
  uid: uidType("user"),
  name: types.string,
}

const actions = (self) => {
  return {
    afterCreate() {
      console.log("created User")
    },
  }
}

const views = (self) => {
  return {}
}

export const User = types.model(model).actions(actions).views(views)
