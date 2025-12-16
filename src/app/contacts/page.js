"use client";
import styles from "@/app/contacts/page.module.css";
import { useState } from "react";

export default function Contacts() {

  const Contacts = [
    {
      name: "Наши контакты",
    },
    {
      name: "Реквизиты",
    },
    {
      name: "Написать нам",
    }
  ]

  
  const[active, setActive] = useState(Contacts[0].name)
  
  return (
    <div className={styles.contacts_wrapper}>
      <div className={styles.contacts_container}>
        <div className={styles.contacts_header}><h1>Контакты</h1></div>
        <div className={styles.contacts_content}>
            <div className={styles.contacts_content_header}>
              {Contacts.map((i, idx) => {

                return(
                  <button onClick={() => setActive(i.name)} key={idx + i.name} className={`${styles.contacts_content_header_button} ${active === i.name ? styles.Active : ""}`}>{i.name}</button>
                )
              })}
            </div>
            {active === "Наши контакты" &&
              <div className={styles.contacts_content_wrapper}>
                <p><span>Адрес нашего офиса:</span>
                  <a href="https://yandex.ru/maps/-/CLwaJB0F" target="_blank">194044, Санкт-Петербург, Пироговская наб., д.17 корп.5 лит.А</a>
                </p>
                <p><span>Время приема заказов: </span>по телефону — с 9.00 до 18.00 (время московское)</p>
                <p><span>Телефоны:</span>
                  <a href="tel: +78126032310">+7 (812) 603-23-10,</a>
                  <a href="tel: +78122235078">+7 (812) 223-50-78</a>
                </p>
                <p><span>Факс:</span> +7 (812) 603-23-16</p>
                <p><span>Email:</span>
                  <a href="mailto:tech@pa.ru">tech@pa.ru</a>
                </p>
              </div>
            }
            {active === "Реквизиты" &&
              <div className={`${styles.contacts_content_wrapper} ${styles.card}`}>
                <p><span>ООО «ПромАвтоматика-Т»</span></p>
                <p><span>ОГРН </span>1089847292941</p>
                <p><span>ИНН</span>7802 441 796</p>
                <p><span>КПП </span>7802 01 001</p>
                <p><span>Р/с</span>4070 2810 2130 0000 4803 в Филиал ОПЕРУ ОАО Банк ВТБ г. Санкт-Петербург</p>
                <p><span>К/с</span>3010 1810 2000 0000 0704</p>
                <p><span>БИК</span>044030704</p>
              </div>
            }
            {active === "Написать нам" &&
              <div className={styles.contacts_content_wrapper}>
              
              </div>
            }
        </div>
      </div>
    </div>
  );
}