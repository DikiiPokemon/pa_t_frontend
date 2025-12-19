"use client";
import styles from "@/app/contacts/page.module.css";
import { useEffect, useState } from "react";

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

  const [form, setForm] = useState(
    {
      theme: "",
      name: "",
      mail: "",
      text: "",
    }
  )
  
  const[active, setActive] = useState(Contacts[0].name)

  useEffect(() => {
    console.log(form);
  }, [form])
  
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
                <br/>
                <p><span>Время приема заказов: </span>по телефону — с 9.00 до 18.00 (время московское)</p>
                <br/>
                <p><span>Телефоны:</span>
                  <a href="tel: +78126032310">+7 (812) 603-23-10,</a>
                  <a href="tel: +78122235078">+7 (812) 223-50-78</a>
                </p>
                <br/>
                <p><span>Факс:</span> +7 (812) 603-23-16</p>
                <br/>
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
                <div className={`${ styles.contacts_content_input_wrapper} ${form.theme !== "" ? styles.Active : ""}`}>
                  <input onChange={e => setForm({...form, theme: e.target.value})} value={form.theme} type="text" placeholder="Тема" className={styles.contacts_content_wrapper_input}/>
                  <label>Тема</label>
                </div>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.name !== "" ? styles.Active : ""}`}>
                  <input onChange={e => setForm({...form, name: e.target.value})} value={form.name} type="text" placeholder="Ваше имя" className={styles.contacts_content_wrapper_input}/>
                  <label>Ваше имя</label>
                </div>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.mail !== "" ? styles.Active : ""}`}>
                  <input onChange={e => setForm({...form, mail: e.target.value})} value={form.mail} type="text" placeholder="Ваш e-mail" className={styles.contacts_content_wrapper_input}/>
                  <label>Ваш e-mail</label>
                </div>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.text !== "" ? styles.Active : ""}`}>
                  <textarea onChange={e => setForm({...form, text: e.target.value})} value={form.text} placeholder="Ваше сообщение" className={styles.contacts_content_wrapper_textarea}/>
                  <label>Ваше сообщение</label>
                </div>
                
                
              </div>
            }
        </div>
      </div>
    </div>
  );
}