import styles from "@/components/Calc.module.css";
import Link from "next/link"
import RangePicker from "./range_picker"
import Selector from "./selector"
import { useState } from "react"
import ToCard from "./To_card"

const LPS_calc = () => {


    return(
        <div className={styles.calc_wrapper}>
            <div className={styles.calc_measurments}>
                <p>Диапазон измерений</p>
                <Selector/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Исполнение</p>
                <Selector/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Тип подключения</p>
                <Selector/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Длина кабеля</p>
                <RangePicker/>
            </div>

            <div className={styles.calc_description}>
                <p>Описание</p>
                <a>Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="">{"ссылка"}</Link>
            </div>
            <div className={styles.calc_stock}>{} в наличии</div>

           <ToCard/>
        </div>
    )
}

export default LPS_calc