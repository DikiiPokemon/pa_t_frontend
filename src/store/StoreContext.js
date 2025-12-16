"use client";
import { createContext, useContext } from "react";
import { productsStore } from "./product_store";

const StoreContext = createContext({
  productsStore,
});

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={{ productsStore }}>
    {children}
  </StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);