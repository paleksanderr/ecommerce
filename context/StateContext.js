import React, { createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCard = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCard) {

      const updatedCartItems = cartItems.map((cardProduct) => {
        if(cardProduct._id === product._id) {
          return { ...cardProduct,
             quantity: cardProduct.quantity + quantity };
        }

      }
      );
      setCartItems(updatedCartItems);
    }else {product.quantity = quantity;
      setCartItems([...cartItems, {...product}]);
    }
    toast.success(`${qty} ${product.name} added to card`);
  }
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
  const newCartItems = cartItems.filter((item) => item._id !== id);

    if(value === 'inc') {
      setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if(value === 'dec') {
       if(foundProduct.quantity > 1) {
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }

    }


  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value=
      {{
        showCard,
        setShowCard,
        cartItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}
      >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);