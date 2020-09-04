import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"

import { Button } from "../components/Button"
import { ViewHeader } from "../components/ViewHeader"
import { ViewDescription } from "../components/ViewDescription"
import { View } from "../components/View"

export const Home = (props) => {
  return (
    <View
      title='How It Works'
      description='Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    >
      <Link href='/box-selection'>
        <Button onClick={console.log}>Get Started</Button>
      </Link>
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
