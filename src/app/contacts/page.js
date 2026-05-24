"use client";
import styles from "@/app/contacts/page.module.css";
import CheckButton from "@/components/CheckButton";
import Error from "@/components/Error";
import { sendContacts } from "@/http/product_controll";
import { useCallback, useEffect, useState } from "react";


export default function Contacts() {
   
  const[err, setErr] = useState(false)
  const[errorMount, setErrorMount] = useState(false)
  const[errMesages, setErrMesages] = useState([])
  const[check, setCheck] = useState(false)

  const [isVisible, setVisible] = useState(true)
  const [prevState, setPrevState] = useState(0)
  const [mail_sent, setMail_sent] = useState(false)


  const handleScroll = useCallback(() => {
    const scroll = window.scrollY;
    
    const shouldBeVisible = scroll <= 40 || prevState > scroll;
    setPrevState(scroll)
    if (shouldBeVisible === isVisible) return;
    setVisible(shouldBeVisible);
  }, [isVisible, prevState]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, handleScroll, prevState]);
      

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
      check: check,
    }
  )
  const [formErr, setFormErr] = useState(
    {
      theme: false,
      name: false,
      mail: false,
      text: false,
    }
  )

  useEffect(() => {
    setForm({...form, check: check})
  }, [check])
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const[active, setActive] = useState(Contacts[0].name)

  async function sendForm(e){
    e.preventDefault()
    let err = {
      theme: false,
      name: false,
      mail: false,
      text: false,
    }
 
    let errMess = []
    
    if(form.theme === ""){
      err.theme = true
      errMess.push("Тему надо обязательно заполнить")
    } 

    if(form.name === ""){
      err.name = true
      errMess.push("Поле имя нужно заполнить")
    }

    if(form.text === ""){
      err.text = true
      errMess.push("Заполните поле Ваше сообщение")
    }

    if(!validateEmail(form.mail)){
      err.mail = true
      errMess.push("Ошибка в поле E-mail, пример: example@example.example")
    }

    console.log(errMess);
    
    

    if(errMess.length !== 0){
    setFormErr(err)
    setErrMesages(errMess)
    setErr(true)
    setErrorMount(true)

    // setTimeout(() => {
    //   setErr(false)
    // }, 5000)
    
    }else{
      sendContacts(form).then(data => {
        setFormErr({
          theme: false,
          name: false,
          mail: false,
          text: false,
        })
        setMail_sent(true)
        setErrMesages([])
        setErr(false)
        setErrorMount(false)
      }).catch(error => {
        setErrMesages([error.response.data.message])
        setErr(true)
        setErrorMount(true)
      })
    }





  }
  
  return (
    <div className={styles.contacts_wrapper}>
      <div className={styles.contacts_container}>
        <div className={styles.contacts_header}><h1>Контакты</h1></div>
        <div className={styles.contacts_content}>
            <div className={styles.product_page_description_nav}>
              {Contacts.map((i, idx) => {
                return(
                  <button onClick={() => setActive(i.name)} key={idx + i.name} className={`${styles.product_page_description_nav_button} ${active === i.name ? styles.Active : ""}`}>{i.name}</button>
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
            {(active === "Написать нам" && !mail_sent) &&
              <form className={styles.contacts_content_wrapper}>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.theme !== "" ? styles.Active : ""}`}>
                  <input onChange={e => setForm({...form, theme: e.target.value})} value={form.theme} type="text" placeholder="Тема" className={`${styles.contacts_content_wrapper_input} ${formErr.theme && styles.input_error}`}/>
                  <label>Тема</label>
                </div>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.name !== "" ? styles.Active : ""}`}>
                  <input onChange={e => setForm({...form, name: e.target.value})} value={form.name} type="text" placeholder="Ваше имя" className={`${styles.contacts_content_wrapper_input} ${formErr.name && styles.input_error}`}/>
                  <label>Ваше имя</label>
                </div>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.mail !== "" ? styles.Active : ""}`}>
                  <input type="email" onChange={e => setForm({...form, mail: e.target.value})} value={form.mail} placeholder="Ваш e-mail" className={`${styles.contacts_content_wrapper_input} ${formErr.mail && styles.input_error}`}/>
                  <label>Ваш e-mail</label>
                </div>
                <div className={`${ styles.contacts_content_input_wrapper} ${form.text !== "" ? styles.Active : ""}`}>
                  <textarea onChange={e => setForm({...form, text: e.target.value})} value={form.text} placeholder="Ваше сообщение" className={`${styles.contacts_content_wrapper_textarea} ${formErr.text && styles.input_error}`}/>
                  <label>Ваше сообщение</label>
                </div>
                <CheckButton label={"Согласие на обработку личной информации"} name={"check"} controller={setCheck}/>
                <button className={`${styles.to_card} ${!check && styles.disable}`} onClick={(e) => check ? sendForm(e) : e.preventDefault()}>Отправить</button>
                
              </form>
              }
              {(active === "Написать нам" && mail_sent) &&
                <div className={styles.contacts_content_wrapper_success}>
                  <div className={styles.contacts_content_container_success}>
                    <h1>Письмо успешно отправлено!</h1>
                    <div className={styles.contacts_content_success}>
                      <img alt="" src="./Check.svg"></img>
                    </div>
                  </div>
                </div>
              }
        </div>
      </div>

      <Error mounted={errorMount} show={err}>
        <div className={styles.error_wrapper} style={isVisible ? {top: "100px"} : {top: "20px"}}>
          <div className={styles.error_container}>
            {
              errMesages.map((i, idx) => {
                return(
                  <div key={"error" + i + idx} className={styles.error_message}>{i}</div>
                )
              })
            }
          </div>
        </div>
      </Error>
    </div>
  );
}