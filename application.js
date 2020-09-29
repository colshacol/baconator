import * as React from "react"
import ReactDOM from "react-dom"
import "react-image-gallery/styles/css/image-gallery.css"
import "regenerator-runtime/runtime"
import { ThemeProvider } from "styled-components"
import { Route, Switch } from "wouter"
import { GlobalStyles } from "./globalStyles"
import { LiquidViewStyles } from "./LiquidViewStyles"
import { FinalCheckoutMenu } from "./src/components/FinalCheckoutMenu"
import { FloatingCartIcon } from "./src/components/FloatingCartIcon"
import { Footer } from "./src/components/Footer"
import { NavBar } from "./src/components/NavBar"
import "./src/state"
import { QueryCacheProvider } from "./src/state.js"
// import { State2Provider } from "./src/state2"
import { BoxProvider } from "./src/useBoxState"
import { BoxProductSelection } from "./src/views/BoxProductSelection"
import { Catalog } from "./src/views/Catalog"
import { LiquidPasser } from "./src/views/LiquidPasser"
import { Product } from "./src/views/Product"
import { Whole30BoxSelection } from "./src/views/Whole30BoxSelection"
import { Store } from "./store"
import { theme } from "./theme"
import LogRocket from "logrocket"

LogRocket.init("xrvlji/pnf-shopify")

const App = () => {
  if (window.location.pathname === "/challenge") {
    const pc = document.querySelector("#pageContent")
    pc.style.display = "flex"
    pc.style.paddingTop = "48px"
    return null
  }

  return (
    <div className='App'>
      <GlobalStyles />
      <LiquidViewStyles />
      <NavBar />

      <FinalCheckoutMenu />
      <Route path='/whole30-approved' component={Whole30BoxSelection} />
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

const Providers = () => {
  return (
    <BoxProvider>
      {/* <State2Provider> */}
      <QueryCacheProvider>
        <Store.Provider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Store.Provider>
      </QueryCacheProvider>
      {/* </State2Provider> */}
    </BoxProvider>
  )
}

if (window.location.pathname !== "/pages/api") {
  const mountPoint = document.getElementById("mountPoint")
  ReactDOM.render(<Providers />, mountPoint)
}

/* 
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
} */
