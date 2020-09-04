import * as React from "react"
import styled from "styled-components"

export const View = (props) => {
  return (
    <ViewContainer>
      <ViewContainerInner>
        <ViewIntro>
          <ViewTitle>{props.title}</ViewTitle>
          <ViewDescription>{props.description}</ViewDescription>
        </ViewIntro>
        <ViewContent>{props.children}</ViewContent>
      </ViewContainerInner>
    </ViewContainer>
  )
}

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 64px 24px 24px;
  width: 100%;
  background: var(--offWhite);

  @media screen and (min-width: 450px) {
    padding: 80px 48px 48px;
  }
`

export const ViewContainerInner = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`

export const ViewIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const ViewTitle = styled.h1`
  color: var(--colorBlack);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`

export const ViewDescription = styled.h1`
  color: var(--colorBlack);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0px;
  line-height: 160%;
`

export const ViewContent = styled.div`
  margin-top: 48px;
`
