"use client";
import styles from "@/app/catalog/page.module.css";
import ProductCard from "@/components/product_card";
import { useContext, useEffect, useState } from "react"
import { Context } from "../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import { productsStore } from "@/store/product_store";

const catalog = observer(() => {

  const product_cards = [
    {
      name: "Датчики",
      products: [
        {
          href: "/catalog/current_prod_lps",
          name: "LPS датчики",
        },
        {
          href: "/catalog/current_prod_fs",
          name: "FS датчики",
        }
      ]
    },
    {
      name: "Электронные блоки",
      products: [
        {
          href: "/catalog/current_prod_bdt",
          name: "Блок преобразования LVDT (BDT)",
        },
        {
          href: "/catalog/current_prod_bfs",
          name: "Блок преобразования FS (BFS)",
        }
      ]
    },
    // {
    //   name: "Аксессуары",
    //   products: [
    //     {
    //       name: "",
    //     },
    //   ]
    // }
  ]


  return(
      <div>
          {
            product_cards.map(i => {
              return(
                <div key={"product_cards " + i.name} className={styles.catalog_wrapper}>
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