import React, { createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQty, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCard = cardItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCard) {

      const updatedCardItems = cardItems.map((cardProduct) => {
        if(cardProduct._id === product._id) {
          return { ...cardProduct,
             quantity: cardProduct.quantity + quantity };
        }

      }
      );
      setCardItems(updatedCardItems);
    }else {product.quantity = quantity;
      setCardItems([...cardItems, {...product}]);
    }
    toast.success(`${qty} ${product.name} added to card`);
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
        cardItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd
      }}
      >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);