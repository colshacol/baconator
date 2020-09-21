import * as arrows from "@arrows/composition"

export const u = (() => {
  const areSimilar = (a, b) => a == b
  const areSame = (a, b) => a === b

  const arrayFindByKeyValue = (target, key, value, fallback) => {
    return target.find((item) => areSimilar(item[key], value)) || fallback
  }

  const arrayFindbyId = (target, id, fallback) => {
    return arrayFindByKeyValue(target, "id", id, fallback)
  }

  const arrayReduceToValues = (target, property) => {
    return target.map((item) => item[property])
  }

  const array = {
    findByKeyValue: arrows.curry(arrayFindByKeyValue),
    findById: arrows.curry(arrayFindbyId),
    reduceToValues: arrows.curry(arrayReduceToValues),
  }

  return {
    array,
  }
})()
