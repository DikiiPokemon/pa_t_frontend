"use client";
import styles from "@/app/catalog/page.module.css";
import MainCard from "@/components/Main_product_card";
import { useStore } from "@/store/StoreContext";


export default function Home() {

  const { productsStore } = useStore()
  
  return (
    <div className={styles.page_wrapper}>
      {
        productsStore.product_cards.map(i => {
          return(
            <div key={"product_cards " + i.name} className={styles.catalog_wrapper}>
              <div className={styles.catalog_section}><h1>{i.name}</h1></div>
                {
                  i.products.map(el => {

                    return(
                      <MainCard key={"prod_card " + el.name} product={el}/>
                    )
                  })
                }
              </div>
          )
          }) 
      }
    </div>
  );
}
