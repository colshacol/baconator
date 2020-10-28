import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "wouter"
import styled from "styled-components"

import { Button } from "../components/Button"
import { View } from "../components/View"

const Pixel = () => {
  return (
    <Helmet
      defer
      onChangeClientState={(newState, addedTags, removedTags) =>
        console.log({ newState, addedTags, removedTags })
      }
      script={[
        {
          type: "text/javascript",
          innerHTML: `var _pix = document.getElementById('_pix_id_5a16f736-748d-60d7-7e13-d3cb5bbc721b');if (!_pix) { var protocol = '//'; var a = Math.random() * 1000000000000000000; _pix = document.createElement('iframe'); _pix.style.display = 'none'; _pix.setAttribute('src', protocol + 's.amazon-adsystem.com/iu3?d=generic&ex-fargs=%3Fid%3D5a16f736-748d-60d7-7e13-d3cb5bbc721b%26type%3D4%26m%3D1&ex-fch=416613&ex-src=https://buy.pedersonsfarms.com/&ex-hargs=v%3D1.0%3Bc%3D7691514600601%3Bp%3D5A16F736-748D-60D7-7E13-D3CB5BBC721B' + '&cb=' + a); _pix.setAttribute('id','_pix_id_5a16f736-748d-60d7-7e13-d3cb5bbc721b'); document.body.appendChild(_pix);}`,
        },
      ]}
    >
      <noscript>
        {`
          <img height='1' width='1' border='0' alt='' src='https://s.amazon-adsystem.com/iui3?d=forester-did&ex-fargs=%3Fid%3D5a16f736-748d-60d7-7e13-d3cb5bbc721b%26type%3D4%26m%3D1&ex-fch=416613&ex-src=https://buy.pedersonsfarms.com/&ex-hargs=v%3D1.0%3Bc%3D7691514600601%3Bp%3D5A16F736-748D-60D7-7E13-D3CB5BBC721B' />
        `}
      </noscript>
    </Helmet>
  )
}

export const Home = () => {
  return (
    <View>
      <Pixel />
      <View.Header data-testid='View.Header'>
        <View.Title>HOW IT WORKS</View.Title>
        <View.Description>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </View.Description>
        <Link href='/box-product-selection'>
          <Button isPrimary>Get Started</Button>
        </Link>
      </View.Header>
      <View.Content>{"..."}</View.Content>
    </View>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 80px 48px 48px;

  .content {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
  }

  .intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    padding: 8px 16px 10px;
    font-size: 16px;
    font-weight: 700;
    display: inline-flex;
    text-align: center;
  }
`
