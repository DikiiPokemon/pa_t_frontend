"use client";
import { createContext, useContext } from "react";
import { productsStore } from "./product_store";

const StoreContext = createContext({
  productsStore,
});

export const StoreProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const products = JSON.parse(localStorage.getItem("cart"))
    const cookie = JSON.parse(localStorage.getItem("cookie"))
    
    if(localStorage.getItem("cart")){
      productsStore.init();
      productsStore.setCart(products)
      productsStore.setCookie(cookie) 
      
    }else{
      productsStore.init();
    }

    if(localStorage.getItem("cookie")){
      productsStore.setCookie(cookie) 
    }else{
      productsStore.setCookie(true) 
    }
  }
  return(
  <StoreContext.Provider value={{ productsStore }}>
    {children}
  </StoreContext.Provider>
)};

export const useStore = () => useContext(StoreContext);