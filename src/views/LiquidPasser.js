import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"

import { Button } from "../components/Button"
import { View } from "../components/View"
import RouteParser from "route-parser"

// tools/recurring/login/customer/3989513371813?
// tools/recurring/portal/ec00f733cc895823/subscriptions?token=bd65f24fec9743088f9537dacc2488ce

const routes = {
  AccountView: new RouteParser("/account"),
  AccountLoginView: new RouteParser("/account/login"),
  AccountRegisterView: new RouteParser("/account/register"),
  AccountChallengeView: new RouteParser("/challenge"),
  AccountPortal: new RouteParser("/tools/recurring/portal/:someId"),

  AccountSubscriptionsPortal: new RouteParser("/tools/recurring/portal/:someId/subscriptions"),
}

const rootMap = {
  account: {
    login: "AccountLoginView",
    "": "AccountView",
  },

  challenge: {
    "": "ChallengeView",
  },

  tools: {
    "": "ToolsView",
  },

  "/account/login": "AccountLoginView",
  "/account": "AccountView",
  "/challenge": "ChallengeView",
  "/tools/": "ToolsView",
}

const log = (...args) => {
  console.log("\n\n[LiquidParser] ", ...args, "\n\n")
}

export const LiquidPasser = (props) => {
  const url = new URL(window.location.href)
  const pathParts = url.pathname.substr(1).split("/")
  log("url.pathname", url.pathname)

  React.useEffect(() => {
    Object.entries(routes).forEach(([key, route]) => {
      if (route.match(url.pathname)) {
        log("route.match", key, url.pathname)
      }
    })

    const rootId = rootMap[window.location.pathname]
    const root = document.querySelector(`#pageContent #${rootId}`)
    const pageContent = document.getElementById("pageContent")
    const container = document.getElementById("LiquidPasser")
    const fragment = document.createDocumentFragment()

    for (const child of pageContent.childNodes) {
      fragment.appendChild(child)
    }

    // const className = root.getAttribute("data-liquidpasser-classname")
    container.replaceWith(pageContent)
    // pageContent.classList.add(className)
    pageContent.style = ``
  }, [])

  const ChildReturner = ({ children }) => {
    return children
  }

  const Component = pathParts[0] === "tools" ? React.Fragment : View

  console.log(pathParts[0])

  return (
    <Component className='LiquidPasser' style={{ height: "100%" }}>
      <div id='LiquidPasser' />
    </Component>
  )
}

const StyledWrapper = styled.div``
