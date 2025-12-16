import { useState } from "react"
import styles from "@/components/Calc.module.css";

const ToCard = () => {
    const [num, setNum] = useState(1)

    function increment (){
        setNum(num + 1)
    }

    function decrement (){
        if(num > 1){
            setNum(num - 1)
        }
    }

    return(
        <div className={styles.calc_numbers}>
            <div className={styles.calc_inc_dec}>
                <button className={num === 1 ? styles.calc_button_disable : styles.calc_button} onClick={() => decrement()}>-</button>
                <div className={styles.calc_number}>{num}</div>
                <button className={styles.calc_button} onClick={() => increment()}>+</button>
            </div>
            <button className={styles.to_card}>В корзину</button>
        </div>
    )
}

export default ToCard