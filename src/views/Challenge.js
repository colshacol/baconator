import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"

import { Button } from "../components/Button"
import { View } from "../components/View"

export const Challenge = (props) => {
  React.useEffect(() => {
    const child = document.querySelector("#pageContent > div")
    const formContainer = document.getElementById("formContainer")
    formContainer.appendChild(child)
  }, [])

  return (
    <View>
      <div id='formContainer' />
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
