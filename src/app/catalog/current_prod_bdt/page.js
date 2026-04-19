"use client";
import styles from "@/app/catalog/page.module.css";
import ProductCard from "@/components/product_card";
import { Suspense, useContext, useEffect, useState } from "react"
import { Context } from "../../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import BDT_calc from "@/components/BDT_clac";
import Arrow from "@/components/assets/Arrow_down.svg"
import Image from "next/image";


const bdt_prod = observer(() => {

    const [description, setDescription] = useState(1)
    const slider = [
        "/assets/images/BDT/BDT_sl_1.jpg", "/assets/images/BDT/BDT_sl_2.jpg", "/assets/images/BDT/BDT_sl_3.jpg", "/assets/images/BDT/BDT_sl_4.jpg"
    ]
    const[activeBlock, setActiveBlock] = useState(0)
    const[Xtarns, setXtrans] = useState(0)
    const dynamicStyle = {
        translate: Xtarns, // Dynamic value from state
    };

    function inc_slider () {
        if(activeBlock === slider.length - 1){
            setActiveBlock(0)
        }else{
            let count = activeBlock + 1
            setActiveBlock(count)
        }
    }

    function dec_slider (){
        if(activeBlock === 0){
            setActiveBlock(slider.length - 1)
        }else{
            let count = activeBlock - 1
            setActiveBlock(count)
        }
    }

    useEffect(() => {
            
        setXtrans(`-${100 / slider.length * activeBlock}%`)
        
    }, [activeBlock])

    return(
        <div className={styles.product_page_wrapper}>
            <div className={styles.product_page_header}>Блок преобразования LVDT (BDT)</div>
            <div className={styles.product_page_charachteristic_wrapper}>
                <div className={styles.product_page_charachteristic_img}>
                    <div className={styles.product_page_slider_wrapper}>
                        <div className={styles.product_page_slider_container} style={dynamicStyle}>
                            {slider.map((i, idx) => {
                                return(
                                    <div key={i + idx} className={styles.product_page_slider_item}><img src={i}/></div>
                                )
                            })

                            }
                        </div>
                    </div>
                    <button onClick={() => dec_slider()} className={`${styles.product_card_to_prod} `}><Image src={Arrow}></Image></button>
                    <button onClick={() => inc_slider()} className={`${styles.product_card_to_prod} `}><Image src={Arrow}></Image></button>
                </div>
                <div className={styles.product_page_charachteristic_container}>
                    <BDT_calc/>
                </div>
               
            </div>
            <div className={styles.product_page_description}>
                <div className={styles.product_page_description_nav}>
                    <button onClick={() => setDescription(1)} className={`${styles.product_page_description_nav_button} ${description === 1 ? styles.Active : ""}`}>Описание</button>
                    <button onClick={() => setDescription(2)} className={`${styles.product_page_description_nav_button} ${description === 2 ? styles.Active : ""}`}>Документация</button>
                    <button onClick={() => setDescription(3)} className={`${styles.product_page_description_nav_button} ${description === 3 ? styles.Active : ""}`}>Сертификаты и декларации</button>
                </div>
                {description === 1 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Описание</h1>
                        <h2 className={styles.product_page_description_main_header}>Блок BDT предназначен для обработки сигнала с преобразователя линейных перемещений LVDT одновременно в токовый сигнал 4 – 20 мА и в сигнал напряжения ±10 В.</h2>
                        <h1 className={styles.product_page_description_main_header}>ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ БЛОКОВ ПРЕОБРАЗОВАНИЯ</h1>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td width="196">Выходной сигнал №1<p></p>
                                        <p>Выходной сигнал №2</p></td>
                                    <td width="76">4-20 мА<p></p>
                                        <p>–</p></td>
                                    <td width="75">±10 В<p></p>
                                        <p>–</p></td>
                                    <td width="61">4-20 мА<p></p>
                                        <p>4-20 мА</p></td>
                                    <td width="61">±10 В<p></p>
                                        <p>±10 В</p></td>
                                    <td width="61">±10 В<p></p>
                                        <p>4-20 мА</p></td>
                                    <td width="149"></td>
                                </tr>
                                <tr>
                                    <td width="196">Крепление</td>
                                    <td colspan="6" width="482">на DIN-рейку</td>
                                </tr>
                                <tr>
                                    <td width="196">Рабочая температура</td>
                                    <td colspan="6" width="482">0…+55 ̊C</td>
                                </tr>
                                <tr>
                                    <td width="196">Материал корпуса</td>
                                    <td colspan="6" width="482"><a href="https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D0%B0%D0%BC%D0%B8%D0%B4">Полиамид</a></td>
                                </tr>
                                <tr>
                                    <td width="196">Напряжение питания</td>
                                    <td colspan="6" width="482">=24В (-15% ÷ +10%)</td>
                                </tr>
                                <tr>
                                    <td width="196">Потребляемая мощность</td>
                                    <td colspan="6" width="482">не более 2 ВА</td>
                                </tr>
                                <tr>
                                <td width="196">Напряжение питания преобразователя линейного перемещения</td>
                                    <td colspan="6" width="482">~10В, 2,5 кГц</td>
                                </tr>
                                <tr>
                                    <td width="196">Максимальное выходное напряжение возбуждения</td>
                                    <td colspan="6" width="482">12 В ампл.</td>
                                </tr>
                                <tr>
                                    <td width="196">Диапазон выходного сигнала на преобразователь линейного перемещения</td>
                                    <td colspan="6" width="482">±11 В</td>
                                </tr>
                                <tr>
                                    <td width="196">Выходной ток на преобразователь линейного перемещения</td>
                                    <td colspan="6" width="482">11 мА</td>
                                </tr>
                                <tr>
                                    <td width="196">Входное напряжение с преобразователя линейного перемещения</td>
                                    <td colspan="6" width="482">0,1…0,35 В</td>
                                </tr>
                                <tr>
                                    <td width="196">Макс. коммутируемый ток «сухого контакта» Err</td>
                                    <td colspan="6" width="482">0,5 А</td>
                                </tr>
                                <tr>
                                    <td width="196">Макс коммутируемое напряжение «сухого контакта» Err</td>
                                    <td colspan="6" width="482">125 В</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {description === 2 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Документация</h1>
                        <ul>
                            <li><a href="" target="_blank">Описание и схема подключения блока BDT</a></li>
                            <li><a href="" target="_blank">Модель корпуса в формате STL</a></li>
                            <li><a href="" target="_blank">Модель корпуса в формате STEP</a></li>
                        </ul>
                    </div>
                }
                {description === 3 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Сертификаты и декларации</h1>
                        <h2 className={styles.product_page_description_main_header}>Федеральное агенство по техническому регулированию и метрологии</h2>
                        <ul>
                            <li><a href="" target="_blank">Сертификат об утверждении типа средств измерений</a></li>
                        </ul>
                    </div>
                }
                
            </div>
        </div>
    )
})

export default bdt_prod;