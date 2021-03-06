import React from "react"
import RouteParser from "route-parser"
import { View } from "../components/View"

const routes = {
  AccountView: new RouteParser("/account"),
  AccountLoginView: new RouteParser("/account/login"),
  AccountResetPassword: new RouteParser("/account/reset/*rest"),
  AccountRegisterView: new RouteParser("/account/register"),
  AccountActivate: new RouteParser("/account/activate/:foo/:rest"),
  // AccountChallengeView: new RouteParser("/challenge"),
  AccountPortal: new RouteParser("/tools/recurring/portal/:someId"),
  AccountSubscriptionsPortal: new RouteParser("/tools/recurring/portal/:someId/subscriptions"),
}

const onLoginScreen = () => {
  const recoverLink = document.querySelector('[href="#recover"]')

  recoverLink.addEventListener("click", () => {
    const recoverForm = document.querySelector("div#recover")
    recoverForm.style.display = "flex"
  })
}

export const LiquidPasser = () => {
  const url = new URL(window.location.href)
  const pathParts = url.pathname.substr(1).split("/")
  console.log("url.pathname", url.pathname)
  let doRender = true

  React.useEffect(() => {
    Object.entries(routes).forEach(([key, route]) => {
      if (route.match(url.pathname)) {
        console.log("route.match", key, url.pathname)
        if (key === "AccountView") {
          doRender = false
          window.location.assign("/tools/recurring/login")
        }
      }
    })

    if (!doRender) return null

    const pageContent = document.getElementById("pageContent")
    const container = document.getElementById("LiquidPasser")
    const fragment = document.createDocumentFragment()

    for (const child of pageContent.childNodes) {
      fragment.appendChild(child)
      console.log({ child })
    }

    container.replaceWith(pageContent)
    pageContent.style = ``
  }, [])

  React.useEffect(() => {
    if (url.pathname.startsWith("/account/login")) {
      onLoginScreen()
    }
  }, [url.pathname])

  const ChildReturner = ({ children }) => {
    return children
  }

  const Component = pathParts[0] === "tools" ? React.Fragment : View

  return (
    <Component className='LiquidPasser' style={{ height: "100%" }}>
      <div id='LiquidPasser' />
    </Component>
  )
}
