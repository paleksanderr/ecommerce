import React from 'react'

import { Product, HeroBanner , FooterBanner }  from '../components';

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Welcome to the home page</h2>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      </div>

      <div className='products-container'>
        {['Product 1', 'Product 2',].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home