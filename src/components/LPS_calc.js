import styles from "@/components/Calc.module.css";
import Link from "next/link"
import RangePicker from "./range_picker"
import Selector from "./selector"
import { useState } from "react"
import ToCard from "./To_card"

const LPS_calc = () => {

    const Range = [
        "0..7", "0..10", "0..15", "0..20", "0..25", "0..30", "0..40", "0..50", "0..60", "0..70", "0..80", "0..90", "0..100", "0..110", "0..140", "0..150", "0..170", "0..220", "0..250", "0..330", "0..440", "0..550", "0..660"
    ]

    const Execution =[
        "FS = свободный шток",
        "DS = направленный шток"
    ]

    const Type = [  
        "CA = встроенный кабель",
        "C1 = разъем-радиальный",
        "CW = встроенные провода с аксиальным выходом"
    ]

    return(
        <div className={styles.calc_wrapper}>
            <div className={styles.calc_measurments}>
                <p>Диапазон измерений</p>
                <Selector key={"LPS1"} arr={Range}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Исполнение</p>
                <Selector key={"LPS2"} arr={Execution}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Тип подключения</p>
                <Selector key={"LPS3"} arr={Type}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Длина кабеля</p>
                <RangePicker/>
            </div>

            <div className={styles.calc_description}>
                <p>Описание</p>
                <p>LVDT (линейный переменный дифференциальный трансформатор) представляет вид индуктивных преобразователей, предназначенных для применения в жестких, промышленных условиях, при высокой температуре и/или давлении, при больших ускорениях и большом числе циклов перемещений.</p>
                <a>Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="">{"Датчики линейного перемещения"}</Link>
            </div>
            <div className={styles.calc_stock}>{} в наличии</div>

           <ToCard/>
        </div>
    )
}

export default LPS_calc