import "regenerator-runtime/runtime"

import * as React from "react"
import ReactDOM from "react-dom"
import { Link, Route } from "wouter"
import { GlobalStyles } from "./globalStyles"
import { Home } from "./src/views/Home"
import { BoxSelection } from "./src/views/BoxSelection"
import { NavBar } from "./src/components/NavBar"
import { Footer } from "./src/components/Footer"
import { Cart } from "./src/components/Cart"
import { BoxProductSelection } from "./src/views/BoxProductSelection"
import { useStoreInitializers } from "./src/stores"
import { BoxProductOptionQuickView } from "./src/components/BoxProductOptionQuickView"
import { Product } from "./src/views/Product"
import { Catalog } from "./src/views/Catalog"
import { ThemeProvider } from "styled-components"
import { theme } from "./theme"
import { SideNav } from "./src/components/SideNav"

const App = () => {
  useStoreInitializers()

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <SideNav />
        <Route path='/box-product-selection' component={Cart} />
        <Route path='/box-product-selection' component={BoxProductOptionQuickView} />
        <GlobalStyles />
        <NavBar />
        <Route path='/' component={Home} />
        <Route path='/box-selection' component={BoxSelection} />
        <Route path='/box-product-selection' component={BoxProductSelection} />
        <Route path='/product/:productId' component={Product} />
        <Route path='/catalog' component={Catalog} />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

const mountPoint = document.getElementById("mountPoint")
ReactDOM.render(<App />, mountPoint)
