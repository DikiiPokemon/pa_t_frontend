"use client";
import styles from "@/app/catalog/page.module.css";
import MainCard from "@/components/Main_product_card";
import { useStore } from "@/store/StoreContext";
import Image from "next/image";


export default function Home() {

  const { productsStore } = useStore()
  
  return (
    <div className={styles.page_wrapper}>

      <div className={styles.main_rail_string}>
        <div className={styles.catalog_section}><h1>С нами работают</h1></div>
        <div className={styles.items_wrap}>
          <div className={`${styles.items} ${styles.marquee}`}>
            {
              productsStore.merquee.map((i, idx) => {
                return(
                  <Image alt={i.alt} height={100} width={i.width} key={i.url + idx} className={styles.item} src={i.url}></Image>
                )
              })
            }
          </div>
          <div aria-hidden="true" className={`${styles.items} ${styles.marquee}`}>
            {
              productsStore.merquee.map((i, idx) => {
                return(
                  <Image alt={i.alt} height={100} width={i.width} key={i.url + idx} className={styles.item} src={i.url}></Image>
                )
              })
            }
          </div>
        </div>
      </div>
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
