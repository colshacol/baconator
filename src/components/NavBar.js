import React from "react"
import { Link, Route, navigate } from "wouter"
import styled from "styled-components"
import { useLocation } from "wouter"
import { useSharedStore } from "../stores"

export const NavBar = (props) => {
  const sharedStore = useSharedStore()
  const [location, setLocation] = useLocation()

  return (
    <StyledWrapper>
      <div className='topBar'>
        <div className='topLinks'>
          <a href='/admin' className='topLink'>
            Sign In
          </a>
        </div>
      </div>
      <div className='bottomBar'>
        <div className='logoWrapper' onClick={() => setLocation("/")}>
          <img src={window.pedersonsData.assets.logoImageUrl} alt="Pederson's Logo" />
        </div>
        <div className='bottomLinks'>
          <Link href='/'>
            <a className='bottomLink'>Home</a>
          </Link>
          <Link href='/catalog'>
            <a className='bottomLink'>Catalog</a>
          </Link>
        </div>
      </div>
      <div className='menuButtonContainer'>
        <img
          src={window.pedersonsData.assets.menuIconUrl}
          alt='menu'
          onClick={sharedStore.toggleIsSideNavOpen}
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
  padding: 8px 48px 16px 48px;
  position: relative;

  .topBar,
  .bottomBar {
    width: 100%;
    max-width: 1080px;
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
    color: #fff;
    text-decoration: none;
    font-size: 14px;
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
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    margin-left: 48px;
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
    height: 120px;

    .topBar,
    .bottomLinks {
      display: flex;
    }

    .menuButtonContainer {
      display: none;
    }

    .logoWrapper {
      width: 180px;
      min-width: 180px;
      position: relative;
      top: -32px;

      img {
        width: 180px;
        height: 90px;
      }
    }
  }

  @media (min-width: 768px) {
  }
`
