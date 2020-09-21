import * as React from "react"
import { ReactQueryDevtools } from "react-query-devtools"
import { useMutation, useQuery, QueryCache, ReactQueryCacheProvider } from "react-query"
import count from "@extra-array/count"
import removeOne from "remove-one"
import { of } from "await-of"
import wretch from "wretch"
import { VARIANT_TITLE_30, VARIANT_TITLE_50 } from "./consts"

const useCleanerMutation = (...args) => {
  const [mutate, info] = useMutation(...args)
  mutate.status = info.status
  mutate.data = info.data
  mutate.error = info.error
  return mutate
}

const useMutator = (handle, handler) => {
  return useMutation(handler, {
    onSuccess: (data, mutationVariables) => {
      queryCache.invalidateQueries(handle)
    },
  })
}

const useAddItemMutator = () => {
  return useMutator("cart", (item) => {})
}
