"use client";
import styles from "@/app/reviews/page.module.css";
import { useState } from "react";
import Image from "next/image";



export default function Reviews() {

  const reviews = [
    {
      name: "ПАО \"Юнипро\"",
      url: "/assets/reviews/Uni_pro.jpg",
    }, 
    {
      name: "ООО \"Турбосистема\"",
      url: "/assets/reviews/turbo_system.jpg",
    },
     {
      name: "ООО \"ТСА-Сервис\"",
      url: "/assets/reviews/TSA_service.jpg",
    },
     {
      name: "АО \"Жамбыльская ГРЭС\"",
      url: "/assets/reviews/GRES_Jambilskaia.jpg",
    },
     {
      name: "ООО НПФ \"Цифровые Системы Регулирования\"",
      url: "/assets/reviews/Digit_system..jpg",
    },
     {
      name: "АО \"АЛМАТИНСКИЕ ЭЛЕКТРИЧЕСКИЕ СТАНЦИИ\"",
      url: "/assets/reviews/Almata.jpg",
    },
  ]

  const[active, setActive] = useState(null)

  
  return (
    <div className={styles.reviews_wrapper}>
      <div className={styles.reviews_container}>
        <div className={styles.reviews_header}><h1>Отзывы</h1></div>
        <div className={styles.reviews_content}>
          <div className={styles.reviews_content_header}>
            {reviews.map((i, idx) => {

              return(
                <div key={idx + i.name} className={styles.reviews_content_button_wrapper}>
                  <button  onClick={() => setActive(idx === active ? null : idx)} className={`${styles.reviews_content_header_button} ${active === idx ? styles.Active : ""} ${idx === 0 ? styles.first_el : ""} ${idx === reviews.length - 1 ? styles.last_el : ""}`}>{i.name}</button>
                  <div className={`${styles.reviews_content_image_wrapper} ${active === idx ? styles.Active_img : ""}`}>
                    <img src={i.url}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}