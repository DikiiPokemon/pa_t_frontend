"use client"
import styles from "@/components/Selector.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Arrow from "@/components/assets/Arrow_down.svg"

const Selector = (props) => {

    const [active, setActive] = useState(false)

    const callMenu = useRef(null)

    useEffect(() => {
        const onClick = e => callMenu.current.contains(e.target) || setActive(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    // function setVal(i){
    //     console.log(i);
        
    //     setSelect(i)
    //     setValue(i)
    // }

    return(
        <div ref={callMenu} onClick={() => setActive(!active)} className={styles.selector_wrapper}>
            <div className={styles.active_element}>{props.select}</div>
            <Image className={`${active ? styles.Act_img : ""}`} src={Arrow} alt=""></Image>
            <div className={`${styles.menu_wrapper} ${active ? styles.Active : ""}`}>
                {
                    props.arr?.map((i,idx) => {
                        if(i !== props.select){
                            return(
                                <button onClick={() => props.setSelect(i)} key={i + idx} className={styles.selector_element}>{i}</button>
                            )
                        }
                    })
                }
            </div>
            
        </div>
    )
}

export default Selector