 import React,{useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/TheMeals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

 function App() {
  const[cartIsShown,setCartIsShown]=useState(false)

  function showCartHandler(){
    setCartIsShown(true)
  }

  function hideCartHandler(){
    setCartIsShown(false)
  }

  return (
    <CartProvider >
      {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onClick={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;

