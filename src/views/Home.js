import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"

import { Button } from "../components/Button"
import { View } from "../components/View"

export const Home = (props) => {
  return (
    <View>
      <View.Header data-testid='View.Header'>
        <View.Title>How It Works</View.Title>
        <View.Description>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
          molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
          pariatur?
        </View.Description>
        <Link href='/box-selection'>
          <Button isPrimary onClick={console.log}>
            Get Started
          </Button>
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
