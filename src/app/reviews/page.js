"use client";
import styles from "@/app/reviews/page.module.css";
import { useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/StoreContext";



export default function Reviews() {

  const { productsStore } = useStore()
  const[active, setActive] = useState(null)

  
  return (
    <div className={styles.reviews_wrapper}>
      <div className={styles.reviews_container}>
        <div className={styles.reviews_header}><h1>Отзывы</h1></div>
        <div className={styles.reviews_content}>
          <div className={styles.reviews_content_header}>
            {productsStore.reviews.map((i, idx) => {

              return(
                <button onClick={() => setActive(idx === active ? null : idx)} key={idx + i.name} className={`${styles.reviews_content_button_wrapper} ${active === idx ? styles.Active : ""}`}>
                  <div className={`${styles.reviews_content_image_wrapper} ${active === idx ? styles.Active_img : ""}`}>
                    <img src={i.url}/>
                  </div>
                  <div className={`${styles.reviews_content_header_button}`}>{i.name}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}