import wretch from "wretch"
import * as React from "react"
import { createContext, useContext } from "react"
import * as shopifyApi from "./utilities/shopifyApi"
import useBoolean from "react-hanger/useBoolean"

const SUBSCRIPTION_PROPERTIES = {
  shipping_interval_frequency: "1",
  shipping_interval_unit_type: "Month",
}

export const createProductIdMap = (products) => {
  const keyValuePairs = products.map((item) => [String(item.id), item])
  return Object.fromEntries(keyValuePairs)
}

export const createVariantIdMap = (products) => {
  const getVariantKeyPair = (item) => (variant) => [String(variant.id), item.id]
  const handleProuct = (item) => item.variants.map(getVariantKeyPair(item))
  const keyValuePairs = products.map(handleProuct)
  return Object.fromEntries(keyValuePairs.flat())
}

const countItems = (box) => {
  return Object.values(box).reduce((final, item) => {
    final += item.quantity
    return final
  }, 0)
}

const getCartPrice = (box) => {
  return Object.values(box).reduce((final, item) => {
    return item.price * item.quantity
  }, 0)
}

const getCartTotalPrice = (box) => {
  let foundCount = 0

  return Object.values(box).reduce((final, { quantity, variant50 }) => {
    Array(quantity)
      .fill("")
      .forEach(() => {
        const discount = foundCount ? 2000 : 0
        const discountedPrice = variant50.price - discount
        console.log({ foundCount, discount, discountedPrice, vp: variant50.price })
        final += discountedPrice
        foundCount++
      })

    return final
  }, 0)
}

const getCartItems = (box) => {
  const entries = Object.entries(box)

  return entries.reduce((final, entry) => {
    // entry = [productId, product]
    const product = entry[1]
    const variant = product.variant50

    return [
      ...final,
      {
        id: variant.id,
        quantity: product.quantity,
        properties: SUBSCRIPTION_PROPERTIES,
      },
    ]
  }, [])
}

const sliceStringAtMatch = (target, match) => {
  const matched = target.match(match) || [{ index: -1, length: 0 }]
  return target.slice(0, matched.index)
}

const allProducts = window.pnf.allProducts.map((product) => {
  product.titleWithoutPackageQuantity = sliceStringAtMatch(product.title, /\(\d pack/i)
  product.variantIds = product.variants.map(({ id }) => id)
  return product
})

export const useMainBoxState = (() => {
  const productIdMap = createProductIdMap(allProducts)
  const variantIdMap = createVariantIdMap(allProducts)

  return () => {
    const [rechargeDiscounts, setRechargeDiscounts] = React.useState([])
    const [box, updateBox] = React.useState({})
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)
    const isCartOpen = useBoolean()

    const changeItemQuantity = (id, modifier) => {
      updateBox(({ [id]: item, ...state }) => {
        const newItem = { ...productIdMap[id] }

        if (item) {
          item.quantity = item.quantity + modifier
          return item.quantity < 1 ? state : { ...state, [id]: item }
        }

        newItem.quantity = modifier
        return newItem.quantity > 0 ? { ...state, [id]: newItem } : state
      })
    }

    const addItem = (id) => {
      changeItemQuantity(id, 1)
    }

    const removeItem = (id) => {
      changeItemQuantity(id, -1)
    }

    const removeProduct = (id) => {
      changeItemQuantity(id, -9999)
    }

    const emptyBox = () => {
      updateBox({})
    }

    const boxProductList = Object.values(box)
    const boxProductCount = Object.keys(box).length
    const boxQuantityCount = countItems(box)
    const cartTotalPrice = getCartTotalPrice(box)
    const cartPrice = getCartPrice(box)
    const gotCart = useBoolean(false)

    React.useEffect(() => {
      if (isCheckoutOpen) {
        const items = getCartItems(box)
        shopifyApi.addToCart(items).then(() => gotCart.toggle())
      }
    }, [isCheckoutOpen])

    const getRechargeDiscounts = () => {
      const url = "https://pnf-services.tasteink.com/api/getDiscounts?limit=250"
      const headers = { "Content-Type": "application/json" }

      wretch(url)
        .headers(headers)
        .get()
        .json()
        .then((data) => {
          console.log("GOT DISCOUNTS", data)
          setRechargeDiscounts(data.discounts)
        })
        .catch((error) => {
          console.error("DIDNT GET DISCOUNTS", error)
        })
    }

    React.useEffect(() => {
      shopifyApi.emptyCart().then(() => console.log("CART EMPTYIED"))
      getRechargeDiscounts()
    }, [])

    return {
      getRechargeDiscounts,
      rechargeDiscounts,
      isCartOpen,
      box,
      addItem,
      removeItem,
      productIdMap,
      variantIdMap,
      changeItemQuantity,
      boxProductList,
      boxProductCount,
      boxQuantityCount,
      cartTotalPrice,
      removeProduct,
      emptyBox,
      isCheckoutOpen,
      setIsCheckoutOpen,
      cartPrice,
    }
  }
})()

const Context = createContext()

export const useBoxState = () => {
  const store = useContext(Context)
  return store
}

export const BoxProvider = (props) => {
  const state = useMainBoxState()
  window.boxState = state
  return <Context.Provider value={state}>{props.children}</Context.Provider>
}
