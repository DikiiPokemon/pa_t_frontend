import { useState } from "react"
import styles from "@/components/Calc.module.css";

const ToCard = (props) => {
    

    return(
        <div className={styles.calc_numbers}>
            <div className={styles.calc_inc_dec}>
                <button className={props.num === 1 ? styles.calc_button_disable : styles.calc_button} onClick={() => props.decrement()}>-</button>
                <div className={styles.calc_number}>{props.num}</div>
                <button className={styles.calc_button} onClick={() => props.increment()}>+</button>
            </div>

            <div className={styles.to_card_price}>Цена: {props.price} руб./шт.</div>
            <button className={styles.to_card} onClick={() => props.func()}>В корзину</button>
            
        </div>
    )
}

export default ToCard