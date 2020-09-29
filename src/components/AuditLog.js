import { slide as Menu } from "react-burger-menu"
import "regenerator-runtime/runtime"
import styled from "styled-components"

export const AuditLog = (props) => {
  return null
}

const StyledMenu = styled(Menu)`
  background: #fff;

  .bottomLink {
    cursor: pointer;
    font-size: 24px;
    line-height: 200%;
  }

  .innerContainer {
    height: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 16px;

    .top {
      display: flex;
      flex-direction: column;
    }
  }

  .cartItem {
    margin-bottom: 24px;

    p {
      color: #446263;
    }
  }

  .boxTitle {
    margin-bottom: 24px;
    color: var(--brandBlack100);
  }

  .shippingRow {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--brandBlack50);
    padding-bottom: 8px;

    p {
      color: var(--brandBlack100);
    }

    h4 {
      color: var(--brandGreen100);
    }
  }

  .priceRow {
    padding-top: 8px;
    display: flex;
    justify-content: space-between;

    h2 {
      color: var(--brandBlack100);
    }

    h2.price {
      color: var(--brandGreen100);
    }
  }

  .checkout_button {
    margin-top: 24px;
    width: 100%;
  }
`
