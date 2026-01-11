import styles from "@/components/Calc.module.css";
import Link from "next/link"
import RangePicker from "./range_picker"
import Selector from "./selector"
import { useState } from "react"
import ToCard from "./To_card"


const FS_calc = () => {
    const SignalType = [
       "A – аналоговый", "PP – push pull"
    ]

    const Diametr = [
        "12", "14", "18", "22"
    ]

    const Long =[
        "73",
        "101",
        "132"
    ]

    const Type = [  
        "CA = встроенный кабель",
        "C1 = разъем",
    ]

    return(
        <div className={styles.calc_wrapper}>
            <div className={styles.calc_measurments}>
                <p>Тип выходного сигнала:</p>
                <Selector key={"FS1"} arr={SignalType}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Диаметр, мм:</p>
                <Selector key={"FS2"} arr={Diametr}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Длина, мм:</p>
                <Selector key={"FS3"} arr={Long}/>
            </div>
             <div className={styles.calc_measurments}>
                <p>Тип присоединения:</p>
                <Selector key={"FS3"} arr={Type}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Длина кабеля</p>
                <RangePicker/>
            </div>

            <div className={styles.calc_description}>
                <p>Описание</p>
                <p>Высокочастотные датчики частоты вращения подходят для использования с зубчатым колесом из ферромагнитного материала для генерации сигналов пропорциональной частоты вращения.</p>
                <a>Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="">{"Датчики частоты вращения"}</Link>
            </div>
            <div className={styles.calc_stock}>{} в наличии</div>

           <ToCard/>
        </div>
    )
}

export default FS_calc