import "react-image-gallery/styles/css/image-gallery.css"
import "regenerator-runtime/runtime"

import * as React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "styled-components"
import { Route, Switch } from "wouter"
import { GlobalStyles } from "./globalStyles"
import { LiquidViewStyles } from "./LiquidViewStyles"
import { FinalCheckoutMenu } from "./src/components/FinalCheckoutMenu"
import { FloatingCartIcon } from "./src/components/FloatingCartIcon"
import { NavBar } from "./src/components/NavBar"
import { BoxProvider } from "./src/useBoxState"
import { BoxProductSelection } from "./src/views/BoxProductSelection"
import { Catalog } from "./src/views/Catalog"
import { LiquidPasser } from "./src/views/LiquidPasser"
import { Product } from "./src/views/Product"
import { Whole30BoxSelection } from "./src/views/Whole30BoxSelection"
import { theme } from "./theme"

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
        <Route path='/account/activate/:rest*' component={LiquidPasser} />
        <Route path='/account' component={LiquidPasser} />
        <Route path='/account/reset/:rest*' component={LiquidPasser} />
      </Switch>
    </div>
  )
}

const Providers = () => {
  return (
    <BoxProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BoxProvider>
  )
}

if (window.location.pathname !== "/pages/api") {
  const mountPoint = document.getElementById("mountPoint")
  ReactDOM.render(<Providers />, mountPoint)
}
