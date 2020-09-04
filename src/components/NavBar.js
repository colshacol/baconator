import React from "react"
import { Link, Route, navigate } from "wouter"
import styled from "styled-components"
import { useLocation } from "wouter"
export const NavBar = (props) => {
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
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  background: #02383a;
  /* howdy */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
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
    margin-left: 248x;
  }

  .logoWrapper {

    width: 100%;
    height: 120px;
    position: absolute;
    left: 0;
    top: 0;
    padding-bottom: 16px;

    img {
      width: clamp(150px, 50%, 70%);
    }
  }

  @media (min-width: 530px) {

    .logoWrapper {
    width: 180px;
    min-width: 180px;
    position: relative;
    bottom: 40px;

    img {
      width: 100%;
      max-width: 100%;
    }
  }

  @media (min-width: 768px) {

    .logoWrapper {
    width: 200px;
    min-width: 200px;
    position: relative;
    bottom: 40px;

    img {
      width: 100%;
      max-width: 100%;
    }
  }
`
