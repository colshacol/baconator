import React from "react"
import { Link, Route, navigate } from "wouter"
import styled from "styled-components"
import { useLocation } from "wouter"
import { useSharedStore } from "../stores"
import { Store } from "../../store"

import { useWindowWidth } from "@react-hook/window-size"
import { SideNav } from "./SideNav"
import useBoolean from "react-hanger/useBoolean"

const links = {
  top: [
    { label: "Recipes", href: "https://pedersonsfarms.com/recipes" },
    { label: "Sign In", href: "https://buy.pedersonsfarms.com/account/login" },
  ],

  bottom: [
    { label: "Shop", href: "/" },
    { label: "Find", href: "https://pedersonsfarms.com/find" },
    { label: "Sell", href: "https://pedersonsfarms.com/sell" },
    { label: "Products", href: "/products" },
  ],
}

const useLocationTest = () => {
  const [location] = useLocation()
  if (location === "/account") return true
  if (location === "/account/login") return true
  if (location === "/account/register") return true
  if (location === "/challenge") return true
  if (location.startsWith("/tools")) return false
  return true
}

export const NavBar = (props) => {
  const isSideNavOpen = useBoolean()
  const windowWidth = useWindowWidth()
  const result = useLocationTest()

  if (!result) return null

  return (
    <StyledWrapper>
      {windowWidth < 760 && <SideNav isOpen={isSideNavOpen.value} toggle={isSideNavOpen.toggle} />}
      <div className='topBar'>
        <div className='topLinks'>
          {links.top.map((link) => {
            const isLocal = link.href.startsWith("/")
            const Component = isLocal ? Link : "a"

            return (
              <Component key={link.label} href={link.href} className='topLink'>
                {link.label}
              </Component>
            )
          })}
        </div>
      </div>
      <div className='bottomBar'>
        <a href='https://pedersonsfarms.com'>
          <div className='logoWrapper'>
            <img src={window.pedersonsData.assets.logoImageUrl} alt="Pederson's Logo" />
          </div>
        </a>
        <div className='bottomLinks'>
          <Link href='/'>
            <p className='bottomLink'>Shop</p>
          </Link>
          <a href='https://pedersonsfarms.com/find'>
            <p className='bottomLink'>Find</p>
          </a>
          <a href='https://pedersonsfarms.com/sell'>
            <p className='bottomLink'>Sell</p>
          </a>
          <Link href='/products'>
            <p className='bottomLink'>Products</p>
          </Link>
        </div>
      </div>
      <div className='menuButtonContainer'>
        <img
          src={window.pedersonsData.assets.menuIconUrl}
          alt='menu'
          onClick={isSideNavOpen.toggle}
        />
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  background: var(--brandDarkGreen100);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  min-height: 100px;
  padding: 8px 48px 16px 48px;
  position: relative;

  .topBar,
  .bottomBar {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }

  .topBar {
    display: flex;
    height: 40px;
  }

  .topLinks {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
  }

  .topLink {
    margin-left: 16px;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    text-transform: uppercase;
    transition: all 0.4s ease-in-out;
  }

  .topLink:hover,
  .bottomLink:hover {
    opacity: 0.7;
  }

  .bottomBar {
    display: flex;
    height: 80px;
  }

  .bottomLinks {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 60px;
    align-items: center;
  }

  .bottomLink {
    cursor: pointer;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    margin-left: 48px;
    text-transform: uppercase;
    transition: all 0.4s ease-in-out;
  }

  .topBar,
  .bottomLinks {
    display: none;
  }

  .logoWrapper {
    user-select: none;
    z-index: 50;
    width: 100%;
    height: 100px;
    position: absolute;
    left: 0;
    top: 16px;
    padding-bottom: 16px;
    display: flex;
    justify-content: center;

    img {
      width: 160px;
      height: 80px;
    }
  }

  .menuButtonContainer {
    user-select: none;
    z-index: 100;
    position: absolute;
    right: 0;
    top: 0;
    height: 100px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 24px;
    }
  }

  @media (min-width: 530px) {
    height: 124px;
    min-height: 124px;

    .logoWrapper {
      width: 180px;
      min-width: 180px;
      position: relative;
      top: 8px;

      img {
        width: 180px;
        height: 90px;
      }
    }
  }

  @media (min-width: 768px) {
    .menuButtonContainer {
      display: none;
    }

    .topBar,
    .bottomLinks {
      display: flex;
    }

    .logoWrapper {
      width: 240px;
      min-width: 240px;
      position: relative;
      top: -32px;

      img {
        width: 240px;
        height: 120px;
      }
    }
  }
`
