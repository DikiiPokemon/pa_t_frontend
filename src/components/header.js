import styles from "@/components/Header.module.css";
import Link from "next/link"
import Image from "next/image";
import Logo from "@/components/assets/LogoPAT.svg"
import Logo_descr from "@/components/assets/Logo_descr.svg"
import Cart from "@/components/assets/Cart.svg"
import Search from "@/components/assets/Search.svg"
import Call from "@/components/assets/Call.svg"
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const Header = () => {
    const pathname = usePathname()


    const [call, setCall] = useState(false)
    const [search, setSearch] = useState(false)
    const [call_m, setCall_m] = useState(false)
    const [search_m, setSearch_m] = useState(false)
    const [burger, setBurger] = useState(false)
    const callMenu = useRef(null)
    const callMenuBurger = useRef(null)

    console.log(call);
    
        
    useEffect(() => {
        const onClick = e => callMenu.current.contains(e.target) || setCall(false) || setSearch(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        const onClick = e => callMenuBurger.current.contains(e.target) || setCall_m(false) || setSearch_m(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        console.log(pathname);
        
    }, [pathname])


    return(
        <div className={styles.header_wrapper}>
            <div className={styles.header_container}>
                <div className={styles.header_img}>
                    <Image className={styles.header_img_logo} src={Logo} alt={""}/>
                    <Image src={Logo_descr} alt={""}/>
                </div>
                <div className={styles.header_navigation}>
                    <Link className={`${styles.header_link} ${pathname === "/" ? styles.header_link_active : ""}`} href="/">Главная<span></span></Link>
                    <Link className={`${styles.header_link} ${pathname.split("/")[1] === "catalog" ? styles.header_link_active : ""}`} href="/catalog">Каталог<span></span></Link>
                    <Link className={`${styles.header_link} ${pathname === "/articles" ? styles.header_link_active : ""}`} href="/articles">Статьи<span></span></Link>
                    <Link className={`${styles.header_link} ${pathname === "/reviews" ? styles.header_link_active : ""}`} href="/reviews">Отзывы<span></span></Link>
                    <Link className={`${styles.header_link} ${pathname === "/contacts" ? styles.header_link_active : ""}`} href="/contacts">Контакты<span></span></Link>
                </div>
                <div ref={callMenu} className={styles.header_callback}>
                    <button className={styles.header_button}><Image src={Cart} alt={""}/></button>
                    <button onClick={() => {setSearch(true); setCall(false)}} className={search ? styles.header_button_active : styles.header_button}>
                        <Image src={Search} alt={""}/>
                        {search&&
                            <input type="text" className={styles.search_input} placeholder="Поиск"></input>
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
                <div className={styles.burger_trigger}>
                    <button onClick={() => setBurger(!burger)} className={`${styles.burger_button} ${burger ? styles.Active : ""}`}>
                        <span></span>
                    </button>
                </div>
                <div className={`${styles.burger_wrapper} ${burger ? styles.Open : ""}`}>
                    <div className={`${styles.header_navigation} ${styles.mobile}`}>
                        <Link className={pathname === "/" ? styles.header_link_active : ""} href="/">Главная<span></span></Link>
                        <Link className={pathname === "/catalog" ? styles.header_link_active : ""} href="/catalog">Каталог<span></span></Link>
                        <Link className={pathname === "/articles" ? styles.header_link_active : ""} href="/articles">Статьи<span></span></Link>
                        <Link className={pathname === "/reviews" ? styles.header_link_active : ""} href="/reviews">Отзывы<span></span></Link>
                        <Link className={pathname === "/contacts" ? styles.header_link_active : ""} href="/contacts">Контакты<span></span></Link>
                    </div>
                    <div ref={callMenuBurger} className={`${styles.header_callback} ${styles.mobile_buttons}`}>
                        <button className={styles.header_button}><Image src={Cart} alt={""}/></button>
                        <button onClick={() => {setSearch_m(true); setCall_m(false)}} className={search_m ? styles.header_button_active : styles.header_button}>
                            <Image src={Search} alt={""}/>
                            {search_m&&
                                <input type="text" className={styles.search_input} placeholder="Поиск"></input>
                            }
                        </button>
                        <button onClick={() => {setSearch_m(false); setCall_m(true)}} className={call_m ? styles.header_button_active : styles.header_button}>
                            <Image src={Call} alt={""}/>
                            {/* {call&&
                                <a href="tel: +7 (812) 603-23-10" className={styles.call_active}>+7 (812) 603-23-10</a>
                            } */}

                            <a href="tel: +7 (812) 603-23-10" className={call_m ? styles.call_active_open : styles.call_active}>+7 (812) 603-23-10</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header