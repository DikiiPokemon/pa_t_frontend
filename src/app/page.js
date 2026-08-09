"use client";
import styles from "@/app/catalog/page.module.css";
import MainCard from "@/components/Main_product_card";
import { useStore } from "@/store/StoreContext";
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  const { productsStore } = useStore()
  
  return (
    <div className={styles.page_wrapper}>

      <div className={styles.page_hello_wrapper}>
        <div className={styles.page_hello_container}>
          <div className={styles.page_hello_header}>
            <h1>Промавтоматика-Т</h1>
            <h3>Идеальное решение для промышленных систем.</h3>
            <p>Мы производим точные измерительные приборы для линейных перемещений, тахометрические датчики, а также блоки преобразования BDT и BFS</p>
          </div>
          <Image></Image>
        </div>
        <Link href="/catalog" className={styles.page_hello_catalog}>Решения</Link>
        
      </div>

      <div className={styles.page_about_wrapper}>
        <div className={styles.page_about_container}>
          <div className={styles.page_about}>
            <h1>1. Собственное производство</h1>
            <p>Наше оборудование на 100% собирается на нашем производстве в г. Санкт-Петербург, мы отвечаем за качество каждой собранной детали</p>
          </div>
          <div className={styles.page_about}>
            <h1>2. Датчики производятся на отечественной элементной базе</h1>
            <p>Наши датчики производятся на отечественной базе и подходят для решений на производствах, где необходимо отечественное оборудование</p>
          </div>
          <div className={styles.page_about}>
            <h1>3. Чрезвычайная надежность работы в особо сложных условиях</h1>
            <p>Наши датчики подходят для производств с особо сложными условиями (тут мы их перечислим)</p>
          </div>
          <div className={styles.page_about}>
            <h1>4. Минимальное время отклика</h1>
            <p>За счет минимального времени отклика это идеальное решение для высокоответственных систем</p>
          </div>
          <div className={styles.page_about}>
            <h1>5. Возможность изготовления аксессуаров</h1>
            <p>За счет производства аксессуаров, можем реализовать решение подходящее конкретно под ваш запрос монтажа и установки</p>
          </div>
          <div className={styles.page_about}>
            <h1>6. Исполнение под Ваши параметры</h1>
            <p>Изготовим датчики которые идеально подходят под Ваши задачи</p>
          </div>
          <div className={styles.page_about}>
            <h1>7. Импортозамещение</h1>
            <p>Производим решения по аналогам зарубежных производителей</p>
          </div>
        </div>
      </div>

      {/* <div className={styles.main_rail_string}>
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
      } */}
      
    </div>
  );
}
