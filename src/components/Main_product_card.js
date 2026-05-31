"use client";
import Link from "next/link"
import styles from "@/components/ProductCard.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const MainCard = ({product}) => {

    const[activeBlock, setActiveBlock] = useState(0)
    const[Xtarns, setXtrans] = useState(0)
    const dynamicStyle = {
        translate: Xtarns, // Dynamic value from state
    };

    useEffect(() => {
        setXtrans(activeBlock === 0 ? "0" : "-50%")
    }, [activeBlock])


    return(
        <div className={styles.product_card_wrapper}>
            <Link href={product.href} style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}></Link>
            <div className={styles.product_card_container}>
                <div className={styles.product_card_img}>
                    <Image alt={product.name} width={"300"} height={"300"}  src={product.img}/>
                </div>
                <div className={styles.product_card_info}> 
                    <h1 className={styles.product_card_name}>{product.name}</h1>
                    <div className={styles.product_card_button_wrapper}>
                        <button onClick={() => setActiveBlock(0)} className={`${styles.product_card_to_prod} ${activeBlock === 0 && styles.Active_button}`}>Описание</button>
                        <button onClick={() => setActiveBlock(1)} className={`${styles.product_card_to_prod} ${activeBlock === 1 && styles.Active_button}`}>Характеристики</button>
                    </div>
                    <div className={styles.product_card_info_container_slider}>
                        <div className={styles.product_card_info_container} style={dynamicStyle}>
                            <div className={styles.product_card_description}>{product.description}</div>
                            <ul className={styles.product_card_description}>
                                {product.characteristic.length === 0 ?
                                    <div>Пока в разработке, скоро будет информация</div>
                                    :
                                    product.characteristic.map((el, i) => {
                                        return(
                                            <li key={i + el}>{el}</li>
                                        )
                                    }) 
                                }
                            </ul>
                        </div>
                    </div>
                    <Link href={product.href} id={styles.to_prod} className={styles.product_card_to_prod}>К товару</Link>
                </div>
            </div>
        </div>
    )
}

export default MainCard