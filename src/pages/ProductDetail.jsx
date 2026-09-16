import React from 'react'
import ProductHero from '../components/ProductHero'
import "./styles/Product.css"
import Description from '../components/Description'
import Reviews from '../components/Reviews'
import Destinations from '../components/Destinations'
const ProductDetail = () => {
  return (
    <div className='product-detail'>
      <ProductHero/>
      <Description/>
      <Reviews/>
      <Destinations/>
    </div>
  )
}

export default ProductDetail
