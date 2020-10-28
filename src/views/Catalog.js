import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { ProductListProduct } from "../components/ProductListProduct"
import { View } from "../components/View"
import { useBoxState } from "../useBoxState"

const Pixel = (props) => {
  return (
    <Helmet
      defer
      onChangeClientState={(newState, addedTags, removedTags) =>
        console.log({ newState, addedTags, removedTags })
      }
      script={[
        {
          type: "text/javascript",
          innerHTML: `var _pix = document.getElementById('_pix_id_c3955f69-91a1-ed0e-a556-a4c0a7db3ad7');if (!_pix) { var protocol = '//'; var a = Math.random() * 1000000000000000000; _pix = document.createElement('iframe'); _pix.style.display = 'none'; _pix.setAttribute('src', protocol + 's.amazon-adsystem.com/iu3?d=generic&ex-fargs=%3Fid%3Dc3955f69-91a1-ed0e-a556-a4c0a7db3ad7%26type%3D4%26m%3D1&ex-fch=416613&ex-src=https://buy.pedersonsfarms.com/products&ex-hargs=v%3D1.0%3Bc%3D7691514600601%3Bp%3DC3955F69-91A1-ED0E-A556-A4C0A7DB3AD7' + '&cb=' + a); _pix.setAttribute('id','_pix_id_c3955f69-91a1-ed0e-a556-a4c0a7db3ad7'); document.body.appendChild(_pix);}`,
        },
      ]}
    >
      <noscript>
        {`
            <img
              height='1'
              width='1'
              border='0'
              alt=''
              data-testid='catalogPixel'
              src='https://s.amazon-adsystem.com/iui3?d=forester-did&ex-fargs=%3Fid%3Dc3955f69-91a1-ed0e-a556-a4c0a7db3ad7%26type%3D4%26m%3D1&ex-fch=416613&ex-src=https://buy.pedersonsfarms.com/products&ex-hargs=v%3D1.0%3Bc%3D7691514600601%3Bp%3DC3955F69-91A1-ED0E-A556-A4C0A7DB3AD7'
            />
          `}
      </noscript>
    </Helmet>
  )
}

export const Catalog = () => {
  const [searchValue, setSearchValue] = React.useState("")
  const [collectionFilter, setCollectionFilter] = React.useState("available-products")
  const state = useBoxState()
  const onSearchInput = (event) => setSearchValue(event.target.value)
  const setFilter = (filter) => setCollectionFilter(filter)

  const allProducts = state.allProducts.reduce((final, product) => {
    if (final[product.id]) return final
    final[product.id] = product
    return final
  }, {})

  const productsToShow = Object.values(allProducts).filter((product) => {
    const isInCollection = product.collections.includes(collectionFilter)
    const title = product.title.toLowerCase()
    const search = searchValue.toLocaleLowerCase()
    const matchesSearch = title.includes(search)
    return isInCollection && matchesSearch
  })

  return (
    <View>
      <Pixel />
      <View.TempTop title='Products' description='' />
      <StyledViewContent>
        <BoxProductTypeFilters
          filter={collectionFilter}
          setFilter={setFilter}
          setSearchValue={onSearchInput}
          searchValue={searchValue}
        />
        <BoxOptions>
          {productsToShow.map((product) => (
            <React.Fragment key={product.title}>
              <ProductListProduct product={product} />
            </React.Fragment>
          ))}
        </BoxOptions>
      </StyledViewContent>
    </View>
  )
}

const StyledViewContent = styled(View.Content)`
  display: flex;
  flex-direction: column;
`

const BoxOptions = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px 24px;
  grid-gap: 24px 24px;

  @media (min-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
