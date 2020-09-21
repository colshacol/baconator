import * as React from "react"
import styled from "styled-components"

export const View = (props) => {
  return <ViewContainer {...props} />
}

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: var(--brandOffWhite100);
`

const ViewContainerInner = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`

View.Header = styled.div`
  --xPadding: 24px;
  --sidePadding: max(calc(((100vw - 1100px) / 2) + 24px), 24px);
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 64px var(--sidePadding) 24px;
  background: var(--brandDarkGreen100);
`

View.Title = styled.h1`
  color: var(--brandWhite100);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`

View.Description = styled.p`
  color: var(--brandWhite100);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  line-height: 160%;
`

View.Content = styled.div`
  padding: 48px 24px 24px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;

  @media screen and (min-width: 450px) {
    /* padding: 48px 48px 48px; */
  }
`

View.TempTop = (props) => {
  return (
    <TempTopContainer>
      <div className='viewHeaderInnerContainer'>
        <h1 className='viewTitle'>{props.title}</h1>
        <p className='viewDescription'>{props.description}</p>
      </div>
    </TempTopContainer>
  )
}

const TempTopContainer = styled.div`
  padding: 48px 24px;
  width: 100%;
  height: fit-content;
  background-color: var(--brandDarkGreen100);

  .viewHeaderInnerContainer {
    margin: 0 auto;
    max-width: 1100px;
    padding: 48 24px;
    display: flex;
    flex-direction: column;
  }

  .viewDescription {
    margin-top: 24px;
  }

  .viewTitle,
  .viewDescription {
    color: #fff;
  }

  @media (min-width: 760px) {
    padding: 96px 24px 48px;
  }
`
