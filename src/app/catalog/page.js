"use client";
import styles from "@/app/catalog/page.module.css";
import ProductCard from "@/components/product_card";
import { useContext, useEffect, useState } from "react"
import { Context } from "../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import { productsStore } from "@/store/product_store";
import { useStore } from "@/store/StoreContext";

const catalog = observer(() => {

  const { productsStore } = useStore()


  return(
      <div className={styles.page_wrapper} style={{gap: "30px"}}>
          {
            productsStore.product_cards.map(i => {
              return(
                <div id={i.anchor} key={"product_cards " + i.name} className={styles.catalog_wrapper} style={{gap: "30px"}}>
                  <div className={styles.catalog_section}><h1>{i.name}</h1></div>
                  <div className={styles.catalog_container}>
                    {
                      i.products.map(el => {

                        return(
                          <ProductCard key={"prod_card " + el.name} product={el}/>
                        )
                      })
                    }
                  </div>
                </div>
              )
              }) 
          }
      </div>
  )
})

export default catalog;