"use client";
import styles from "@/app/catalog/page.module.css";
import ProductCard from "@/components/product_card";
import { Suspense, useContext, useEffect, useState } from "react"
import { Context } from "../../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import Arrow from "@/components/assets/Arrow_down.svg"
import Image from "next/image";
import BFS_calc from "@/components/BFS_calc";


const bfs_prod = observer(() => {

    const [description, setDescription] = useState(1)
    const slider = [
        "/assets/images/BFS/BFS_sl_1.jpg", "/assets/images/BFS/BFS_sl_2.jpg", "/assets/images/BFS/BFS_sl_3.jpg", "/assets/images/BFS/BFS_sl_4.jpg"
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
            <div className={styles.product_page_header}>Блок преобразования FS (BFS)</div>
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
                    <BFS_calc/>
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
                        <h2 className={styles.product_page_description_main_header}>Преобразователь сигналов измеряемых частот BFS-01 предназначен для формирования прямоугольного сигнала из входного синусоидального сигнала.</h2>
                        <h1 className={styles.product_page_description_main_header}>Основные технические характеристики:</h1>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>&nbsp;№</p>
                                    </td>
                                    <td>Наименование параметра</td>
                                    <td>Значение</td>
                                    <td>Ед. изм.</td>
                                    <td>Примечание</td>
                                </tr>
                                <tr>
                                    <td>1.</td>
                                    <td>
                                        <p>Амплитуда вх. синусоидального сигнала</p>
                                    </td>
                                    <td>
                                        <p>1…100</p>
                                    </td>
                                    <td>V</td>
                                    <td>
                                        <p>перем.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>
                                        <p>Амплитуда вых. импульсного сигнала</p>
                                    </td>
                                    <td>
                                        <p>24</p>
                                    </td>
                                    <td>V</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td>
                                        <p>Номинальное напряжение питания</p>
                                    </td>
                                    <td>
                                        <p>24</p>
                                    </td>
                                    <td>V</td>
                                    <td>пост.</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>4.</p>
                                    </td>
                                    <td>Рабочая температура</td>
                                    <td>0 – 60</td>
                                    <td>ºС</td>
                                    <td>
                                        <p>
                                    </p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>5.</p>
                                    </td>
                                    <td>Габаритные размеры</td>
                                    <td>20 х 100 х 110</td>
                                    <td>мм</td>
                                    <td>
                                        <p>
                                    </p></td>
                                </tr>
                                <tr>
                                    <td>6.</td>
                                    <td>
                                        <p>Масса</p>
                                    </td>
                                    <td>100</td>
                                    <td>г</td>
                                    <td>
                                        <p>
                                    </p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                {description === 2 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Документация</h1>
                        <ul>
                            <li><a href="" target="_blank">Техническое описание</a></li>
                            {/* <li><a href="" target="_blank">Модель корпуса в формате STL</a></li>
                            <li><a href="" target="_blank">Модель корпуса в формате STEP</a></li> */}
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

export default bfs_prod;