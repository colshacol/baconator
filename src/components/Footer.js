import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { useLocation } from "wouter"

const useLocationTest = () => {
  const [location] = useLocation()
  if (location === "/account") return true
  if (location === "/account/login") return true
  if (location === "/account/register") return true
  if (location === "/challenge") return true
  if (location.startsWith("/tools")) return false
  return true
}

export const Footer = (props) => {
  const result = useLocationTest()
  if (!result) return null
  return <StyledWrapper>{<a href='/admin'>Admin</a>}</StyledWrapper>
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 24px 48px;
`
