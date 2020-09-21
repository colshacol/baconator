import * as React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

const SETTINGS = {
  totalDuration: 4000,
  topTextEnterDelay: 300,
  bottomTextEnterDelay: 500,
  topTextExitDelay: 3500,
  bottomTextExitDelay: 3800,
}

const StyledContainer = styled(motion.div)`
  padding: 0 16px;
  @media (min-width: 530px) {
    padding: 0 24px;
  }
`

const StyledSavingsIcon = styled.img`
  max-width: 48px;
  margin-right: 24px;

  @media (min-width: 530px) {
    max-width: 64px;
    margin-right: 32px;
  }
`

export const Encouragement = (props) => {
  const [variant, setVariant] = React.useState("closed")
  const lastCount = React.useRef(props.productCount)
  const timeout = React.useRef()
  const renders = React.useRef(0)

  const variants = {
    closed: { top: -80, opacity: 0 },
    open: { top: 0, opacity: 1 },
    interrupt: { transition: { duration: 0 }, opacity: 0, top: -80 },
  }

  const style = {
    boxShadow: "0px 4px 16px -8px rgba(0,0,0,0.51)",
    display: "flex",
    flexDirection: "column",
    background: "#019390",
    height: 80,
    width: "100%",
    position: "fixed",
    top: -80,
    left: 0,
    zIndex: 50000,
  }

  const handle = () => {
    setVariant("open")
    timeout.current = setTimeout(() => setVariant("closed"), SETTINGS.totalDuration)
  }

  const interrupt = () => {
    clearTimeout(timeout.current)
    setVariant("interrupt")
  }

  React.useEffect(() => {
    const isMore = lastCount.current < props.productCount
    console.log(isMore, lastCount.current, props.productCount)
    if (isMore && props.productCount && renders.current !== 0) {
      const shouldInterrupt = variant === "open"
      shouldInterrupt && setVariant("interrupt")
      shouldInterrupt ? interrupt() : handle()
    }

    lastCount.current = props.productCount
    renders.current++
  }, [props.productCount])

  React.useEffect(() => {
    if (variant === "interrupt") {
      setTimeout(() => handle(), 50)
    }
  }, [variant])

  return (
    <StyledContainer style={style} animate={variant} variants={variants}>
      <EncouragementContent parentVariant={variant} productCount={props.productCount} />
    </StyledContainer>
  )
}

const EncouragementContent = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "hidden",
        height: "100%",
        maxWidth: 980,
        width: "100%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <StyledSavingsIcon src={window.pedersonsData.assets.savingsIconUrl} alt='save money' />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          position: "relative",
          top: 0,
          left: 0,
        }}
      >
        <EncouragementTop productCount={props.productCount} parentVariant={props.parentVariant} />
        <EncouragementBottom
          productCount={props.productCount}
          parentVariant={props.parentVariant}
        />
      </div>
    </div>
  )
}

const StyledTop = styled(motion.div)`
  --top: -4px;
  text-align: right;
  font-size: 24px;
  @media (min-width: 530px) {
    --top: 6px;
    font-size: inherit;
  }
`

const EncouragementTop = (props) => {
  const [variant, setVariant] = React.useState("pending")
  const timeouts = React.useRef({})

  const variants = {
    pending: { height: 0, opacity: 0, top: -50 },
    active: { height: 30, opacity: 1, top: 0, ...duration(0.4) },
    leaving: { height: 0, top: -60, opacity: 0 },
    interrupt: { transition: { duration: 0 }, height: 0, opacity: 0, top: -50 },
  }

  React.useEffect(() => {
    console.log(props.parentVariant)
    if (props.parentVariant === "open") {
      timeouts.current.active = setTimeout(() => setVariant("active"), SETTINGS.topTextEnterDelay)
      timeouts.current.leaving = setTimeout(() => setVariant("leaving"), SETTINGS.topTextExitDelay)
    }

    if (props.parentVariant === "closed") {
      setVariant("pending")
    }

    if (props.parentVariant === "interrupt") {
      clearTimeout(timeouts.current.active)
      clearTimeout(timeouts.current.leaving)
      setVariant("interrupt")
    }
  }, [props.parentVariant])

  const style = {
    color: "white",
    height: 0,
    overflow: "hidden",
    width: "100%",
    opacity: 1,
    position: "relative",
    zIndex: 50001,
  }

  return (
    <StyledTop animate={variant} variants={variants} style={style}>
      {props.productCount === 1 && <h3 style={{ color: "white" }}>Added to cart!</h3>}
      {props.productCount > 1 && (
        <h3 style={{ color: "white" }}>You've saved ${getTotalSavings(props.productCount)}!</h3>
      )}
    </StyledTop>
  )
}

const duration = (seconds) => {
  return { transition: { duration: seconds } }
}

const StyledBottom = styled(motion.div)`
  --top: 26px;
  --height: 38px;
  text-align: right;

  @media (min-width: 530px) {
    --top: 36px;
    --height: 30px;
  }
`

const EncouragementBottom = (props) => {
  const [variant, setVariant] = React.useState("pending")
  const timeouts = React.useRef({})

  const variants = {
    pending: { height: 0, opacity: 0, top: 100 },
    active: { height: "var(--height)", opacity: 1, top: 0, ...duration(0.5) },
    leaving: { height: 0, top: 200, opacity: 0 },
    interrupt: { transition: { duration: 0 }, height: 0, opacity: 0, top: 200 },
  }

  React.useEffect(() => {
    console.log(props.parentVariant)
    if (props.parentVariant === "open") {
      timeouts.current.active = setTimeout(
        () => setVariant("active"),
        SETTINGS.bottomTextEnterDelay
      )
      timeouts.current.leaving = setTimeout(
        () => setVariant("leaving"),
        SETTINGS.bottomTextExitDelay
      )
    }

    if (props.parentVariant === "closed") {
      setVariant("pending")
    }

    if (props.parentVariant === "interrupt") {
      clearTimeout(timeouts.current.active)
      clearTimeout(timeouts.current.leaving)
      setVariant("interrupt")
    }
  }, [props.parentVariant])

  const style = {
    color: "white",
    height: 0,
    overflow: "hidden",
    width: "100%",
    opacity: 1,
    position: "relative",
    top: 0,
    zIndex: 50001,
  }

  return (
    <StyledBottom animate={variant} variants={variants} style={style}>
      {props.productCount === 1 && (
        <p style={{ color: "white" }}>Continue shopping to save $20.00.</p>
      )}
      {props.productCount > 1 && (
        <p style={{ color: "white" }}>
          Continue shopping to save ${getTotalSavings(props.productCount) + 20}.
        </p>
      )}
    </StyledBottom>
  )
}

const getTotalSavings = (productCount) => {
  return productCount * 20
}
