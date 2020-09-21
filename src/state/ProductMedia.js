import { types } from "mobx-state-tree"
import { uidType } from "./customTypes"

const DEFAULT_PREVIEW_IMAGE = {
  aspect_ratio: 1,
  height: 0,
  src: "",
  width: 0,
}

const model = {
  alt: types.maybeNull(types.string),
  aspect_ratio: types.number,
  height: types.number,
  id: types.number,
  media_type: types.string,
  position: types.number,
  preview_image: types.frozen(DEFAULT_PREVIEW_IMAGE),
  src: types.string,
  width: types.number,
}

const actions = (self) => {
  return {
    afterCreate() {
      console.log("created ProductMedia")
    },
  }
}

const views = (self) => {
  return {}
}

export const ProductMedia = types.model(model).actions(actions).views(views)
