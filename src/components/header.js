"use client";
import styles from "@/components/Header.module.css";
import Link from "next/link"
import Image from "next/image";
import Logo from "@/components/assets/LogoPAT.svg"
import Logo_descr from "@/components/assets/Logo_descr.svg"
import Cart from "@/components/assets/Cart.svg"
import Search from "@/components/assets/Search.svg"
import Call from "@/components/assets/Call.svg"
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import CartModal from "./Cart";
import Close from "@/components/assets/Close.svg"
import Delete from "@/components/assets/Simp_Cross.svg"
import Cart_empty from "@/components/assets/Cart_empty.svg"
import CheckButton from "./CheckButton";
import Error from "./Error";
import { IMaskInput } from "react-imask";
import { sendCart } from "@/http/product_controll";
import Cookie from "./Cookie";
import ToTop from "./buttonToTop";



const Header = observer (() => {
    const pathname = usePathname()
    const { productsStore } = useStore()
    const[check, setCheck] = useState(false)
    const[searchProd, setSearchProd] = useState([])

    const[err, setErr] = useState(false)
    const[errorMount, setErrorMount] = useState(false)
    const[errMesages, setErrMesages] = useState([])

    const[productsSend, setProductSend] = useState(false)
    
    
    const [form, setForm] = useState(
        {
        name: "",
        mail: "",
        phone: "",
        text: "",
        cart: "",
        check: check,
        }
    )

    const [formErr, setFormErr] = useState(
        {
        name: false,
        mail: false,
        phone: false,
        text: false,
        }
    )

    const [call, setCall] = useState(false)
    const [search, setSearch] = useState(false)
    const [call_m, setCall_m] = useState(false)
    const [search_m, setSearch_m] = useState(false)
    const [burger, setBurger] = useState(false)
    const callMenu = useRef(null)
    const callMenuBurger = useRef(null)
    const mobileSearch = useRef(null)
    const [cartMount, setCartMount] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    const [isVisible, setVisible] = useState(true)
    const [prevState, setPrevState] = useState(0)

    const[activeBlock, setActiveBlock] = useState(0)
    const[Xtarns, setXtrans] = useState(0)

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const dynamicStyle = {
        translate: Xtarns, // Dynamic value from state
    };

    useEffect(() => {
        setXtrans(activeBlock === 0 ? "0" : "Calc(-50% + 1px)")
    }, [activeBlock])
    
    useEffect(() => {
        setForm({...form, check: check})
    }, [check])

    const handleScroll = useCallback(() => {
        const scroll = window.scrollY;
        
        const shouldBeVisible = scroll <= 40 || prevState > scroll;
        
        setPrevState(scroll)
        if (shouldBeVisible === isVisible) return;
        setVisible(shouldBeVisible);
        !shouldBeVisible && setBurger(false)
        !shouldBeVisible && setSearch(false)
    }, [isVisible, prevState]);
    
        
    useEffect(() => {
        const onClick = e => callMenu.current.contains(e.target) || setCall(false) || setSearch(false)
        document.addEventListener('click', onClick);
        
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        const onClick = e => callMenuBurger.current.contains(e.target) || setCall_m(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        const onClick = e => mobileSearch.current.contains(e.target) || setSearch_m(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isVisible, handleScroll, prevState]);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    async function sendForm(e){
        e.preventDefault()
        let err = {
            name: false,
            mail: false,
            phone: false,
        }
     
        let errMess = []

        const formData = {
            name: form.name,
            mail: form.mail,
            phone: form.phone,
            text: form.text,
            cart: localStorage.getItem("cart"),
            check: check,
        }

        if(form.phone.length < 18){
            err.phone = true
            errMess.push("Телефон указан неверно")
        }
        
        
        if(form.name === ""){
          err.name = true
          errMess.push("Поле ФИО обязательно для заполнения")
        }
    
        if(!validateEmail(form.mail)){
          err.mail = true
          errMess.push("Ошибка в поле E-mail, пример: example@example.example")
        }
        
        
    
        if(errMess.length !== 0){
            setFormErr(err)
            setErrMesages(errMess)
            setErr(true)
            setErrorMount(true)
        
            // setTimeout(() => {
            // setErr(false)
            // }, 5000)
        
        }else{
          sendCart(formData).then(data => {
            setFormErr({
                name: false,
                mail: false,
                phone: false,
            })
            setProductSend(true)
            setErrMesages([])
            setErr(false)
            setErrorMount(false)

            localStorage.clear()
            productsStore.setCart([])
          }).catch(error => {
            setErrMesages([error.response.data.message])
            setErr(true)
            setErrorMount(true)
          })
        }
    
      }

    function Search_prod(e){
        if(e.target.value !== ""){
            const filtered = productsStore.searcher.filter((p) =>
                p.name.toLowerCase().includes(e.target.value.toLowerCase())
            );

            setSearchProd(filtered)
        }else{
            setSearchProd([])
        }

    }

    function Del_product(index){
        productsStore.Cart.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(productsStore.Cart))
    }


    return(
        <>
            <div className={styles.header_wrapper} style={isVisible ? {top: 0} : {top: "-80px"}}>
                <div className={styles.header_container}>
                    <div className={styles.header_img}>
                        <Image className={styles.header_img_logo} src={Logo} alt={""}/>
                        <Image className={styles.header_img_logo_descr} src={Logo_descr} alt={""}/>
                    </div>
                    <div className={styles.header_navigation}>
                        <Link className={`${styles.header_link} ${pathname === "/" ? styles.header_link_active : ""}`} href="/">Главная<span></span></Link>
                        <Link className={`${styles.header_link} ${pathname.split("/")[1] === "catalog" ? styles.header_link_active : ""}`} href="/catalog">Каталог<span></span></Link>
                        <Link className={`${styles.header_link} ${pathname === "/articles" ? styles.header_link_active : ""}`} href="/articles">Статьи<span></span></Link>
                        <Link className={`${styles.header_link} ${pathname === "/reviews" ? styles.header_link_active : ""}`} href="/reviews">Отзывы<span></span></Link>
                        <Link className={`${styles.header_link} ${pathname === "/contacts" ? styles.header_link_active : ""}`} href="/contacts">Контакты<span></span></Link>
                    </div>
                    <div ref={callMenu} className={styles.header_callback}>
                        <button onClick={() => {setCartOpen(true); setCartMount(true)}} className={styles.header_button_cart}><Image src={Cart} alt={""}/>
                            {mounted&&
                                <span className={`${styles.Count} ${productsStore.Cart.length !== 0 ? styles.ActiveCount : ""}`}>{productsStore.Cart.length}</span>
                            }
                            
                            
                        </button>
                        <button onClick={() => {setSearch(true); setCall(false)}} className={search ? styles.header_button_active : styles.header_button}>
                            <Image src={Search} alt={""}/>
                            {search&&
                                <>
                                    <input type="text" onChange={e => Search_prod(e)} className={styles.search_input} placeholder="Поиск" />
                                    {
                                        searchProd.length !== 0 &&
                                        <div className={styles.serach_prod_wrapper}>
                                        {
                                            searchProd.map((i, idx) => {
                                                return(
                                                    <Link key={i.name + idx} href={i.href} className={styles.serach_prod_container}>
                                                        <img src={i.img}></img>
                                                        <div>{i.name}</div>
                                                    </Link>
                                                )
                                            })
                                        }
                                        </div>
                                    }
                                    
                                </>
                            }
                        </button>
                        <button onClick={() => {setSearch(false); setCall(true)}} className={call ? styles.header_button_active : styles.header_button}>
                            <Image src={Call} alt={""}/>
                            {/* {call&&
                                <a href="tel: +7 (812) 603-23-10" className={styles.call_active}>+7 (812) 603-23-10</a>
                            } */}

                            <a href="tel: +7 (812) 603-23-10" className={call ? styles.call_active_open : styles.call_active}>+7 (812) 603-23-10</a>
                        </button>
                    </div>


                    {/*Mobile burger menu*/}
                    <div ref={mobileSearch} className={styles.burger_trigger}>
                        <button onClick={() => {setSearch_m(true)}} className={search_m ? styles.header_button_active : styles.header_button}>
                            <Image src={Search} alt={""}/>
                            {search_m&&
                                <>
                                    <input type="text" onChange={e => Search_prod(e)} className={styles.search_input} placeholder="Поиск" />
                                    {
                                        searchProd.length !== 0 &&
                                        <div className={styles.serach_prod_wrapper}>
                                        {
                                            searchProd.map((i, idx) => {
                                                return(
                                                    <Link key={i.name + idx} href={i.href} className={styles.serach_prod_container}>
                                                        <img src={i.img}></img>
                                                        <div>{i.name}</div>
                                                    </Link>
                                                )
                                            })
                                        }
                                        </div>
                                    }
                                    
                                </>
                            }
                        </button>
                        <button onClick={() => setBurger(!burger)} className={`${styles.burger_button} ${burger ? styles.Active : ""}`}>
                            <span></span>
                        </button>
                    </div>
                    <div className={`${styles.burger_wrapper} ${burger ? styles.Open : ""}`}>
                        <div className={`${styles.header_navigation} ${styles.mobile}`}>
                            <Link onClick={() => {setBurger(false)}} className={`${styles.header_link} ${pathname === "/" ? styles.header_link_active : ""}`} href="/">Главная<span></span></Link>
                            <Link onClick={() => {setBurger(false)}} className={`${styles.header_link} ${pathname.split("/")[1] === "catalog" ? styles.header_link_active : ""}`} href="/catalog">Каталог<span></span></Link>
                            <Link onClick={() => {setBurger(false)}} className={`${styles.header_link} ${pathname === "/articles" ? styles.header_link_active : ""}`} href="/articles">Статьи<span></span></Link>
                            <Link onClick={() => {setBurger(false)}} className={`${styles.header_link} ${pathname === "/reviews" ? styles.header_link_active : ""}`} href="/reviews">Отзывы<span></span></Link>
                            <Link onClick={() => {setBurger(false)}} className={`${styles.header_link} ${pathname === "/contacts" ? styles.header_link_active : ""}`} href="/contacts">Контакты<span></span></Link>
                        </div>
                        
                    </div>
                </div>

                <CartModal mounted={cartMount} show={cartOpen}>
                {productsStore.Cart.length === 0 ?
                    <div className={`${styles.cart_wrapper} ${cartOpen && styles.cart_wrapper_active}`}>
                        {
                            productsSend ? 
                            <form className={`${styles.cart_container} ${cartOpen && styles.cart_container_active}`} style={{alignItems: "center"}}>
                                <div className={styles.cart_header}>
                                    <div className={styles.cart_header_close}><button className={styles.Close} onClick={() => {setCartOpen(false); setProductSend(false)}}><Image src={Close} alt=""></Image></button></div>
                                </div>
                                <div className={styles.contacts_content_wrapper_success}>
                                <div className={styles.contacts_content_container_success}>
                                    <h1>Письмо успешно отправлено!</h1>
                                    <div className={styles.contacts_content_success}>
                                    <img alt="" src="/Check.svg"></img>
                                    </div>
                                </div>
                                </div>
                            </form>
                            :
                            <div className={`${styles.cart_container} ${cartOpen && styles.cart_container_active}`} style={{alignItems: "center"}}>
                                <div className={styles.cart_header}>
                                    <div className={styles.cart_header_close}><button className={styles.Close} onClick={() => setCartOpen(false)}><Image src={Close} alt=""></Image></button></div>
                                </div>
                                <h1>ВАША КОРЗИНА ПУСТА</h1>
                                <Image src={Cart_empty} alt=""></Image>
                            </div>
                        }
                        
                    </div>
                    :
                    <div className={`${styles.cart_wrapper} ${cartOpen && styles.cart_wrapper_active}`}>
                        <div className={`${styles.cart_container} ${cartOpen && styles.cart_container_active}`}>
                            <div className={styles.cart_header_close}><button className={styles.Close} onClick={() => setCartOpen(false)}><Image src={Close} alt=""></Image></button></div>
                            <div className={styles.slider_container}>
                                <div className={styles.cart_slider} style={dynamicStyle}>
                                    <div className={styles.cart_part_container}>
                                        <div className={styles.cart_header}>
                                            <div className={styles.cart_header_table}>
                                                <div className={styles.cart_header_table_element}>Картинка</div>
                                                <div className={styles.cart_header_table_element}>Модификация</div>
                                                <div className={styles.cart_header_table_element}>Количество</div>
                                                <div className={styles.cart_header_table_element}>Цена</div>
                                            </div>
                                        </div>
                                        <div className={styles.product_preview}>
                                            {
                                                productsStore.Cart.map((i, idx) => {
                                                    const arr = i.id.split("-")
                                                    if(arr[0] === "BDT"){
                                                        return(
                                                            <div key={i.id + idx} className={styles.cart_element_wrapper}>
                                                                <div className={styles.cart_element}>
                                                                    <img src={i.url}/>
                                                                </div>
                                                                <div className={styles.cart_element}>{arr.map((el, index) => {
                                                                    if(index === 0){
                                                                        return(
                                                                            <p key={el + index}>Модель: {el}</p>
                                                                        )
                                                                    }else if(index === 1){
                                                                        return(
                                                                            <p key={el + index}>Тип присоединения: {el}</p>
                                                                        )
                                                                    }else if(index === 2){
                                                                        return(
                                                                            <p key={el + index}>Исполнение: {el}</p>
                                                                        )
                                                                    }else{
                                                                        return(
                                                                            <p key={el + index}>{el}</p>
                                                                        )
                                                                    }
                                                                        
                                                                })}</div>
                                                                <div className={styles.cart_element}>{i.number}</div>
                                                                <div className={styles.cart_element}>{(i.number * i.price).toFixed(2)} руб.</div>
                                                                <button className={styles.cart_element_del} onClick={() => {Del_product(idx)}}><Image src={Delete} alt=""></Image></button>
                                                            </div>
                                                        )
                                                    }else if(arr[0] === "LPS"){
                                                        return(
                                                            <div key={i.id + idx} className={styles.cart_element_wrapper}>
                                                                <div className={styles.cart_element}>
                                                                    <img src={i.url}/>
                                                                </div>
                                                                <div className={styles.cart_element}>{arr.map((el, index) => {
                                                                    if(index === 0){
                                                                        return(
                                                                            <p key={el + index}>Модель: {el}</p>
                                                                        )
                                                                    }else if(index === 1){
                                                                        return(
                                                                            <p key={el + index}>Диапазон измерений: {el}</p>
                                                                        )
                                                                    }else if(index === 2){
                                                                        return(
                                                                            <p key={el + index}>Исполнение: {el}</p>
                                                                        )
                                                                    }else if(index === 3){
                                                                        return(
                                                                            <p key={el + index}>Тип подключения: {el}</p>
                                                                        )
                                                                    }else if(index === 4){
                                                                        return(
                                                                            <p key={el + index}>Кабель: {el}м</p>
                                                                        )
                                                                    }
                                                                })}</div>
                                                                <div className={styles.cart_element}>{i.number}</div>
                                                                <div className={styles.cart_element}>{(i.number * i.price).toFixed(2)} руб.</div>
                                                                <button className={styles.cart_element_del} onClick={() => {Del_product(idx)}}><Image src={Delete} alt=""></Image></button>
                                                            </div>
                                                        )
                                                    }else if(arr[0] === "FS"){
                                                        return(
                                                            <div key={i.id + idx} className={styles.cart_element_wrapper}>
                                                                <div className={styles.cart_element}>
                                                                    <img src={i.url}/>
                                                                </div>
                                                                <div className={styles.cart_element}>{arr.map((el, index) => {
                                                                    if(index === 0){
                                                                        return(
                                                                            <p key={el + index}>Модель: {el}</p>
                                                                        )
                                                                    }else if(index === 1){
                                                                        return(
                                                                            <p key={el + index}>Тип выходного сигнала: {el}</p>
                                                                        )
                                                                    }else if(index === 2){
                                                                        return(
                                                                            <p key={el + index}>Диаметр: {el}мм</p>
                                                                        )
                                                                    }else if(index === 3){
                                                                        return(
                                                                            <p key={el + index}>Длина: {el}мм</p>
                                                                        )
                                                                    }else if(index === 4){
                                                                        return(
                                                                            <p key={el + index}>Тип присоединения: {el}</p>
                                                                        )
                                                                    }else if(index === 5){
                                                                        return(
                                                                            <p key={el + index}>Длина кабеля: {el}м</p>
                                                                        )
                                                                    }
                                                                })}</div>
                                                                <div className={styles.cart_element}>{i.number}</div>
                                                                <div className={styles.cart_element}>{(i.number * i.price).toFixed(2)} руб.</div>
                                                                <button className={styles.cart_element_del} onClick={() => {Del_product(idx)}}><Image src={Delete} alt=""></Image></button>
                                                            </div>
                                                        )
                                                    }else if(arr[0] === "BFS"){
                                                        return(
                                                            <div key={i.id + idx} className={styles.cart_element_wrapper}>
                                                                <div className={styles.cart_element}>
                                                                    <img src={i.url}/>
                                                                </div>
                                                                <div className={styles.cart_element}>{arr.map((el, index) => {

                                                                    return(
                                                                        <p key={el + index}>{el}</p>
                                                                    )
                                                                })}</div>
                                                                <div className={styles.cart_element}>{i.number}</div>
                                                                <div className={styles.cart_element}>{(i.number * i.price).toFixed(2)} руб.</div>
                                                                <button className={styles.cart_element_del} onClick={() => {Del_product(idx)}}><Image src={Delete} alt=""></Image></button>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                        </div>
                                    </div>
                                        
                                        
                                        <form className={styles.cart_part_container}>

                                            <div className={`${ styles.contacts_content_input_wrapper} ${form.name !== "" ? styles.Active : ""}`}>
                                                <input onChange={e => setForm({...form, name: e.target.value})} value={form.name} type="text" placeholder="Ваше ФИО" className={`${styles.contacts_content_wrapper_input} ${formErr.name && styles.input_error}`}/>
                                                <label>Ваше ФИО</label>
                                            </div>
                                            <div className={`${ styles.contacts_content_input_wrapper} ${form.mail !== "" ? styles.Active : ""}`}>
                                                <IMaskInput mask="+7 (000) 000-00-00" onChange={e => setForm({...form, phone: e.target.value})} value={form.phone} placeholder="Ваш телефон" className={`${styles.contacts_content_wrapper_input} ${formErr.phone && styles.input_error}`}/>
                                                <label>Ваш телефон</label>
                                            </div>
                                            <div className={`${ styles.contacts_content_input_wrapper} ${form.mail !== "" ? styles.Active : ""}`}>
                                                <input onChange={e => setForm({...form, mail: e.target.value})} value={form.mail} type="text" placeholder="Ваш e-mail" className={`${styles.contacts_content_wrapper_input} ${formErr.mail && styles.input_error}`}/>
                                                <label>Ваш e-mail</label>
                                            </div>
                                            <div className={`${ styles.contacts_content_input_wrapper} ${form.text !== "" ? styles.Active : ""}`}>
                                                <textarea onChange={e => setForm({...form, text: e.target.value})} value={form.text} placeholder="Примечание к заказу" className={`${styles.contacts_content_wrapper_textarea} ${formErr.text && styles.input_error}`}/>
                                                <label>Примечание к заказу</label>
                                            </div>
                                            <CheckButton name={"check"} controller={setCheck}/>
                                            <button className={`${styles.cart_button} ${activeBlock === 0 && styles.visible} ${!check && styles.disable}`} onClick={(e) => check ? sendForm(e) : e.preventDefault()}>Заказать</button>
                                        </form>
                                        
                                </div>
                            </div>
                            <div className={styles.total_cart}>Итого: {productsStore.Cart.reduce((sum, p) => sum + p.price * p.number, 0)} руб.</div>
                            <button className={`${styles.cart_button}`} onClick={() => setActiveBlock(activeBlock === 0 ? 1 : 0)}>{ activeBlock === 0 ? "Оформить заказ" : "Назад"}</button>
                        </div>
                    </div>
                    }
                </CartModal>

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
            <div ref={callMenuBurger} className={`${styles.header_callback} ${styles.mobile_buttons}`} style={isVisible ? {bottom: "20px"} : {bottom: "-115px"}}>
                <ToTop></ToTop>
                <button onClick={() => {setCartOpen(true); setCartMount(true)}} className={styles.header_button_cart_m}><Image src={Cart} alt={""}/>
                    {mounted&&
                        <span className={`${styles.Count} ${productsStore.Cart.length !== 0 ? styles.ActiveCount : ""}`}>{productsStore.Cart.length}</span>
                    }    

                    
                </button>
                
                <button onClick={() => {setCall_m(true)}} className={call_m ? styles.header_button_active : styles.header_button_m}>
                    <Image src={Call} alt={""}/>
                    {/* {call&&
                        <a href="tel: +7 (812) 603-23-10" className={styles.call_active}>+7 (812) 603-23-10</a>
                    } */}

                    <a href="tel: +7 (812) 603-23-10" className={call_m ? styles.call_active_open : styles.call_active}>+7 (812) 603-23-10</a>
                </button>
            </div>
            {productsStore.Cookie &&
                <Cookie/>
            }
            
        </>
    )
})

export default Header