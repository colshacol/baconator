import * as React from "react"

export const useCleanup = (fn) => {
  React.useEffect(() => {
    return fn
  }, [])
}
