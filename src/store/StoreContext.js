"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { productsStore } from "./product_store";

const StoreContext = createContext({
  productsStore,
});

export const StoreProvider = ({ children }) => {
  const requested = useRef(false)  

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (requested.current) return
    requested.current = true
    productsStore.init();

    const products = JSON.parse(localStorage.getItem("cart"))
    const cookie = JSON.parse(localStorage.getItem("cookie"))
    
    if(localStorage.getItem("cart")){
      productsStore.setCart(products)
      productsStore.setCookie(cookie) 
      
    }

    if(localStorage.getItem("cookie")){
      productsStore.setCookie(cookie) 
    }else{
      productsStore.setCookie(true) 
    }

    setMounted(true)
  }, [])
  
  // if (typeof window !== "undefined") {
  //   const products = JSON.parse(localStorage.getItem("cart"))
  //   const cookie = JSON.parse(localStorage.getItem("cookie"))
    
  //   if(localStorage.getItem("cart")){
  //     productsStore.setCart(products)
  //     productsStore.setCookie(cookie) 
      
  //   }

  //   if(localStorage.getItem("cookie")){
  //     productsStore.setCookie(cookie) 
  //   }else{
  //     productsStore.setCookie(true) 
  //   }
  // }

  if(!mounted) return null

  return(
  <StoreContext.Provider value={{ productsStore }}>
    {children}
  </StoreContext.Provider>
)};

export const useStore = () => useContext(StoreContext);