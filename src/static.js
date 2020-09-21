import * as React from "react"
import { ReactQueryDevtools } from "react-query-devtools"
import { useMutation, useQuery, QueryCache, ReactQueryCacheProvider } from "react-query"
import count from "@extra-array/count"
import removeOne from "remove-one"
import { of } from "await-of"
import fetch from "fetch"
import { VARIANT_TITLE_30, VARIANT_TITLE_50 } from "./consts"

class EnhancedProduct {
  constructor(product) {
    this.prouct = product
  }

  variant50 = (() => {
    this.product.variants.find((variant) => {
      return variant.id === VARIANT_TITLE_50
    })
  })()

  variant30 = (() => {
    this.product.variants.find((variant) => {
      return variant.id === VARIANT_TITLE_50
    })
  })()

  isOutOfStock = (() => {
    const count30 = this.variant30.inventory_count
    const count50 = this.variant50.inventory_count
    return !count30 || !count50
  })()
}

class StaticStore {
  products = window.pnf.allProducts.map((product) => new EnhancedProduct(product))
  collections = window.pnf.allCollections

  getCollection() {}
  getCollectionProducts() {}
  getProduct() {}
}
