"use client";
import styles from "@/app/catalog/page.module.css";
import rev_style from "@/app/reviews/page.module.css";
import MainCard from "@/components/Main_product_card";
import { useStore } from "@/store/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Home() {

  const { productsStore } = useStore()
  const[active, setActive] = useState(null)
  
  return (
    <div className={styles.page_wrapper}>

      <div className={styles.page_hello_wrapper}>
        <div className={styles.page_hello_container}>
          <div className={styles.page_hello_header}>
            <h1>Промавтоматика-Т</h1>
            <h3>Идеальное решение для промышленных систем.</h3>
            <p>Мы производим точные измерительные приборы для линейных перемещений, тахометрические датчики, а также блоки преобразования BDT и BFS</p>
            <Link href="/catalog" className={styles.page_hello_catalog} style={{color: "var(--background-white)"}}>Решения &#9658;</Link>
          </div>
          <Image width={"400"} height={"400"} src={"/Main_page_logo.png"}></Image>
        </div>
        
        
      </div>

      <div className={styles.main_rail_string}>
        <div className={styles.catalog_section}><h1>О нас</h1></div>
        <div className={styles.page_about_container}>
          <div className={styles.page_about + " " + styles.page_fr}>
            <h1>1. Датчики производятся на отечественной элементной базе</h1>
            <p>Наши датчики производятся на отечественной базе и подходят для решений на производствах, где необходимо отечественное оборудование</p>
          </div>
          <div className={styles.page_about + " " + styles.page_sc}>
            <h1>2. Собственное производство</h1>
            <p>Наше оборудование на 100% собирается на нашем производстве в г. Санкт-Петербург, мы отвечаем за качество каждой собранной детали</p>
          </div>
          <div className={styles.page_about + " " + styles.page_th}>
            <h1>3. Минимальное время отклика</h1>
            <p>За счет минимального времени отклика это идеальное решение для высокоответственных систем</p>
          </div>
          <div className={styles.page_about + " " + styles.page_fo}>
            <h1>4. Чрезвычайная надежность работы в особо сложных условиях</h1>
            <p>Наши датчики подходят для производств с особо сложными условиями (тут мы их перечислим)</p>
          </div>
          <div className={styles.page_about + " " + styles.page_fv}>
            <h1>5. Возможность изготовления аксессуаров</h1>
            <p>За счет производства аксессуаров, можем реализовать решение подходящее конкретно под ваш запрос монтажа и установки</p>
          </div>
          <div className={styles.page_about + " " + styles.page_sx}>
            <h1>6. Исполнение под Ваши параметры</h1>
            <p>Изготовим датчики которые идеально подходят под Ваши задачи</p>
          </div>
          <div className={styles.page_about + " " + styles.page_sv}>
            <h1>7. Импортозамещение</h1>
            <p>Производим решения по аналогам зарубежных производителей</p>
          </div>
        </div>
      </div>

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

      <div className={styles.main_rail_string}>
        <div className={styles.catalog_section}><h1>Нам доверяют</h1></div>
        <div className={rev_style.reviews_content + " " + rev_style.page_main_review_content}>
          <div className={rev_style.reviews_content_header + " " + rev_style.page_main_review}>
            {productsStore.reviews.map((i, idx) => {
              if(idx < 4){
                return(
                  <button onClick={() => setActive(idx === active ? null : idx)} key={idx + i.name} style={{background: "var(--background-white)"}} className={`${rev_style.reviews_content_button_wrapper} ${active === idx ? rev_style.Active : rev_style.non_active} ${rev_style.main_btn_wrapper}`}>
                    <div className={`${rev_style.reviews_content_image_wrapper} ${active === idx ? rev_style.Active_img : ""}`}>
                      <img src={i.url}/>
                    </div>
                    <div className={`${rev_style.reviews_content_header_button}`} style={{whiteSpace: "nowrap"}}>{i.name}</div>
                  </button>
                )
              }else{
                return null;
              }
              
            })}
            <Link href="/reviews" className={rev_style.page_more_review}>Больше отзывов &#9658;</Link>
          </div>
        </div>


      </div>
      <div className={styles.main_rail_string}>
        <div className={styles.page_hello_wrapper} style={{height: "auto"}}>
            <div className={rev_style.reviews_container}>
              <div className={rev_style.reviews_content} style={{gap: "10px"}}>
                <div className={rev_style.reviews_header}><h1>Остались вопросы</h1></div>
                <p>Напишите нам и наши специалисты обязательно Вам все расскажут</p>
                <Link href="/contacts/#send" className={rev_style.page_more_review}>Написать Нам &#9658;</Link>
              </div>
            </div>
        </div>
        
      </div>
      
      {/* {
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
      } */}
      
    </div>
  );
}
