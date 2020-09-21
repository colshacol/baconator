import * as React from "react"
import ReactDOM from "react-dom"
import "react-image-gallery/styles/css/image-gallery.css"
import "regenerator-runtime/runtime"
import { ThemeProvider } from "styled-components"
import { Route, Switch } from "wouter"
import { GlobalStyles } from "./globalStyles"
import { AuditLog } from "./src/components/AuditLog"
import { BoxProductOptionQuickView } from "./src/components/BoxProductOptionQuickView"
import { CartMenu } from "./src/components/Cart"
import { Footer } from "./src/components/Footer"
import { NavBar } from "./src/components/NavBar"
import { SideNav } from "./src/components/SideNav"
import "./src/state"
import { BoxProductSelection } from "./src/views/BoxProductSelection"
import { BoxSelection } from "./src/views/BoxSelection"
import { Catalog } from "./src/views/Catalog"
import { Home } from "./src/views/Home"
import { Product } from "./src/views/Product"
import { Store } from "./store"
import { theme } from "./theme"
import { QueryCacheProvider, RQDevtools, useCart, queryCache } from "./src/state.js"
import { CreateAccount } from "./src/views/CreateAccount"
import { UserLogin } from "./src/views/UserLogin"
import { Challenge } from "./src/views/Challenge"
import { LiquidPasser } from "./src/views/LiquidPasser"
import { FloatingCartIcon } from "./src/components/FloatingCartIcon"
import { LiquidViewStyles } from "./LiquidViewStyles"

const Initializer = (props) => {
  const actions = Store.useStoreActions((actions) => ({
    fetchCart: actions.fetchCart,
    emptyCart: actions.emptyCart,
    setCart: actions.setCart,
    fetchCollections: actions.fetchCollections,
    // initialize: actions.initialize,
  }))

  React.useEffect(() => {
    // actions.initialize()
    // actions.emptyCart().then(() => {
    //   queryCache.invalidateQueries("cart")
    // })
    // actions.setCart(window.pnf.cart)
    // actions.fetchCollections()
  }, [])

  return null
}

const App = () => {
  return (
    <div className='App'>
      {/* {process.env.NODE_ENV === "development" && <RQDevtools />} */}
      <Initializer />
      <GlobalStyles />
      <LiquidViewStyles />
      <NavBar />
      {/* <AuditLog /> */}

      <Route path='/:rest*' component={FloatingCartIcon} />
      <Route path='/' component={BoxProductSelection} />
      <Route path='/product/:productId' component={Product} />
      <Route path='/products' component={Catalog} />

      <Switch>
        <Route path='/challenge' component={LiquidPasser} />
        <Route path='/tools/:rest*' component={LiquidPasser} />
        <Route path='/account/register' component={LiquidPasser} />
        <Route path='/account/login' component={LiquidPasser} />
        <Route path='/account' component={LiquidPasser} />
      </Switch>
      <Footer />
    </div>
  )
}

const Providers = (props) => {
  return (
    <QueryCacheProvider>
      <Store.Provider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Store.Provider>
    </QueryCacheProvider>
  )
}

if (window.location.pathname !== "/pages/api") {
  const mountPoint = document.getElementById("mountPoint")
  ReactDOM.render(<Providers />, mountPoint)
}

const getShopifyApiUrl = (options) => {
  const prefix = "https://buy.pedersonsfarms.com/admin/api/2020-07"

  if (options.type === "product") {
    return `${prefix}/products/${options.id}.json`
  }

  if (options.type === "productMetafields") {
    return `${prefix}/products/${options.id}/metafields.json`
  }

  if (options.type === "collections") {
    return `${prefix}/collections.json`
  }

  if (options.type === "collection") {
    return `${prefix}/collections/${options.id}.json`
  }
}
