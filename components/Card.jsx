import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'

const Card = () => {
  const cartRef = useRef()
  const { cartItem, setShowCard, totalQty, totalPrice } = useStateContext();
  return (
    <div>Card</div>
  )
}

export default Card