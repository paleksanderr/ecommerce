import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Card } from './'
import { useStateContext } from '../context/StateContext'


const Navbar = () => {
  const { showCard, setShowCard, totalQty } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Template Shop</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCard(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>`{totalQty}`</span>
      </button>

      { showCard && <Card />}
    </div>
  )
}

export default Navbar