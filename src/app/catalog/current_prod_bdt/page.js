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
        "/assets/images/BDT/BDT_sl_1.jpg", "/assets/images/BDT/BDT_sl_2.jpg", "/assets/images/BDT/BDT_sl_3.jpg", "/assets/images/BDT/BDT_sl_4.jpg", "/assets/images/BDT/BDT_gab.png"
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
                        <div className={styles.product_page_slider_container} style={{dynamicStyle}}>
                            {slider.map((i, idx) => {
                                return(
                                    <div key={i + idx} className={styles.product_page_slider_item}><img src={i}/></div>
                                )
                            })

                            }
                        </div>
                    </div>
                    <button onClick={() => dec_slider()} className={`${styles.product_card_to_prod} `}><Image alt="" src={Arrow}></Image></button>
                    <button onClick={() => inc_slider()} className={`${styles.product_card_to_prod} `}><Image alt="" src={Arrow}></Image></button>
                </div>
                <div className={styles.product_page_charachteristic_container}>
                    <BDT_calc/>
                </div>
               
            </div>
            <div className={styles.product_page_description}>
                
                <div id="full_descript" className={styles.product_page_description_nav}>
                    <button onClick={() => setDescription(1)} className={`${styles.product_page_description_nav_button} ${description === 1 && styles.Active}`}>Описание</button>
                    <button onClick={() => setDescription(4)} className={`${styles.product_page_description_nav_button} ${description === 4 && styles.Active}`}>Схема подключения и калибровка</button>
                    <button onClick={() => setDescription(2)} className={`${styles.product_page_description_nav_button} ${description === 2 && styles.Active}`}>Документация</button>
                    <button onClick={() => setDescription(3)} className={`${styles.product_page_description_nav_button} ${description === 3 && styles.Active}`}>ПО конфигуратора</button>
                </div>
                {description === 1 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Описание</h1>
                        <h2 className={styles.product_page_description_main_header}>Блок BDT предназначен для обработки сигнала с преобразователя линейных перемещений LVDT одновременно в токовый сигнал 4 – 20 мА и в сигнал напряжения ±10 В.</h2>
                        <h1 className={styles.product_page_description_main_header}>ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ БЛОКОВ ПРЕОБРАЗОВАНИЯ</h1>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td style={{width: "196px"}}>Выходной сигнал №1<p></p>
                                        <p>Выходной сигнал №2</p></td>
                                    <td style={{width: "76px"}}>4-20 мА<p></p>
                                        <p>–</p></td>
                                    <td style={{width: "75px"}}>±10 В<p></p>
                                        <p>–</p></td>
                                    <td style={{width: "61px"}}>4-20 мА<p></p>
                                        <p>4-20 мА</p></td>
                                    <td style={{width: "61px"}}>±10 В<p></p>
                                        <p>±10 В</p></td>
                                    <td style={{width: "61px"}}>±10 В<p></p>
                                        <p>4-20 мА</p></td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Крепление</td>
                                    <td colSpan="6" style={{width: "482px"}}>на DIN-рейку</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Рабочая температура</td>
                                    <td colSpan="6" style={{width: "482px"}}>0…+55 ̊C</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Материал корпуса</td>
                                    <td colSpan="6" style={{width: "482px"}}><a href="https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B8%D0%B0%D0%BC%D0%B8%D0%B4">Полиамид</a></td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Напряжение питания</td>
                                    <td colSpan="6" style={{width: "482px"}}>=24В (-15% ÷ +10%)</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Потребляемая мощность</td>
                                    <td colSpan="6" style={{width: "482px"}}>не более 2 ВА</td>
                                </tr>
                                <tr>
                                <td style={{width: "196px"}}>Напряжение питания преобразователя линейного перемещения</td>
                                    <td colSpan="6" style={{width: "482px"}}>~10В, 2,5 кГц</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Максимальное выходное напряжение возбуждения</td>
                                    <td colSpan="6" style={{width: "482px"}}>12 В ампл.</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Диапазон выходного сигнала на преобразователь линейного перемещения</td>
                                    <td colSpan="6" style={{width: "482px"}}>±11 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Выходной ток на преобразователь линейного перемещения</td>
                                    <td colSpan="6" style={{width: "482px"}}>11 мА</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Входное напряжение с преобразователя линейного перемещения</td>
                                    <td colSpan="6" style={{width: "482px"}}>0,1…0,35 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Макс. коммутируемый ток «сухого контакта» Err</td>
                                    <td colSpan="6" style={{width: "482px"}}>0,5 А</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>Макс коммутируемое напряжение «сухого контакта» Err</td>
                                    <td colSpan="6" style={{width: "482px"}}>125 В</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>Блок BDT-07 преобразует сигнал с обмоток преобразователя в нормированный сигнал постоянного тока и/или постоянного напряжения. Значение и тип сигнала зависят от модификации блока BDT, их типы приведены на рисунке 1 и в таблице 2.</p>

                        <p>Структура:</p>
                        <img style={{width: "398px"}} src="/assets/images/BDT/bdt_structure.png" alt=""/>
                        <p>Рис. 1 – Структура модификации блоков BDT</p>

                        <p>Таблица 2 – Значения выходных сигналов блока BDT</p>
                        <table className={styles.table} style={{height: "auto", width: "100%", maxWidth: "550px"}}>
                            <tbody>
                                <tr>
                                    <td style={{width: "196px"}}>Тип выхода</td>
                                    <td colSpan="6" style={{width: "482px"}}>Значение сигнала на выходе</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>I (постоянный ток)</td>
                                    <td colSpan="6" style={{width: "482px"}}>от 4 до 20 мА</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>U (постоянное напряжение)</td>
                                    <td colSpan="6" style={{width: "482px"}}>от -10 до 10 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>N (выход без сигнала)</td>
                                    <td colSpan="6" style={{width: "482px"}}>отсутствует</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Модификация составляется путем выбора двух нужных типов сигнала на выходе, так, например, блок BDT-07-II будет иметь два выходных сигнала постоянного тока со значениями от 4 до 20 мА, а блок BDT-07-NU будет иметь один выходной сигнал постоянного напряжения со значениями от -10 до 10 В.</p>
                        <h1>Краткое описание алгоритма работы блока BDT-07</h1>
                        <p>В основе блока стоит микроконтроллер, при подаче питания он инициализирует всю периферию, при успешной инициализации подается сигнал на индикатор.</p>
                        <p>Первичная обмотка преобразователя линейных перемещений возбуждается синусоидальным сигналом, который задает микроконтроллер, а вторичные обмотки, соединенные последовательно, служат приемником индуцированного сигнала. Разность сигналов с этих обмоток пропорциональна смещению сердечника.</p>
                        <p>Фаза сигнала со вторичной обмотки относительно сигнала с первичной обмотки изменяется пропорционально изменению положению штока. Используемый микроконтроллер детектирует фазу измеряемого сигнала с высокой точностью, что позволяет добиться минимальных погрешностей.</p>
                        <p>В итоге на выходе микросхемы получается напряжение пропорционально смещению сердечника преобразователя линейного перемещения.</p>
                        <p>В случае выхода из строя преобразователя ЛП или отсутствия с ним связи по другим причинам, подается сигнал ошибка (ERR) на клеммы 15 и 16.</p>
                        <p>Дополнительно установлен преобразователь напряжение – токовая петля.</p>
                        <p>Также предусмотрена передача актуального положения датчика, его серийный номер и сигнала ошибки.</p>
                        <p>Сигнал ошибки формируется</p>
                        <p>Имеется два выхода, которые в зависимости от модификации могут быть токовыми петлями или в виде напряжения ±10В.</p>
                        <p>При постановке двух преобразователей ЛП параллельно друг другу рекомендуется включать синхронизацию, позволяет убрать влияние взаимных магнитных помех близко размещённых преобразователей.</p>
                        <img style={{width: "337px"}} src="/assets/images/BDT/BDT_gab.png" alt=""/>
                        <p>Рис. 2 – Габаритные размеры блока</p>

                    </div>
                }
                {description === 2 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Документация</h1>
                        <ul>
                            <li><a href="/assets/docs/bdt/tehnicheskoe-opisanie.pdf" download>Описание и схема подключения блока BDT</a></li>
                            <li><a href="/assets/docs/bdt/bdt-07.zip" download>Модель корпуса в формате STL</a></li>
                            <li><a href="/assets/docs/bdt/BDT.zip" download>Модель корпуса в формате STEP</a></li>
                        </ul>
                    </div>
                }
                {description === 3 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Конфигуратор</h1>
                        <h2 className={styles.product_page_description_main_header}>Ссылка на скачивание</h2>
                        <ul>
                            <li><a href="/assets/soft/BDT-CONFIG_V13.rar" download>Конфигуратор rar</a></li>
                            <li><a href="/assets/soft/BDT-CONFIG_V13.zip" download>Конфигуратор zip</a></li>
                        </ul>
                    </div>
                }
                {description === 4 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Назначение контактов соединителей</h1>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td style={{width: "196px"}}>№ клеммы</td>
                                    <td colSpan="6" style={{width: "482px"}}>Цепь</td>
                                    <td rowSpan={25}><img src="/assets/images/BDT/table_klem.png" alt=""/></td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>1</td>
                                    <td colSpan="6" style={{width: "482px"}}>B (RS485)</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>2</td>
                                    <td colSpan="6" style={{width: "482px"}}>A (RS485)</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>3</td>
                                    <td colSpan="6" style={{width: "482px"}}>TRM</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>4</td>
                                    <td colSpan="6" style={{width: "482px"}}>NC</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>5</td>
                                    <td colSpan="6" style={{width: "482px"}}>+24 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>6</td>
                                    <td colSpan="6" style={{width: "482px"}}>+24 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>7</td>
                                    <td colSpan="6" style={{width: "482px"}}>0 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>8</td>
                                    <td colSpan="6" style={{width: "482px"}}>0 В</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>9</td>
                                    <td colSpan="6" style={{width: "482px"}}>Uout ±10В/Iout 4-20mA</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>10</td>
                                    <td colSpan="6" style={{width: "482px"}}>Общ. OUT</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>11</td>
                                    <td colSpan="6" style={{width: "482px"}}>Uout ±10В/Iout 4-20mA</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>12</td>
                                    <td colSpan="6" style={{width: "482px"}}>Общ. OUT</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>13</td>
                                    <td colSpan="6" style={{width: "482px"}}>+ ERR</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>14</td>
                                    <td colSpan="6" style={{width: "482px"}}>- ERR</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>15</td>
                                    <td colSpan="6" style={{width: "482px"}}>Первичная обмотка –</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>16</td>
                                    <td colSpan="6" style={{width: "482px"}}>Первичная обмотка +</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>17</td>
                                    <td colSpan="6" style={{width: "482px"}}>Вторичная обмотка –</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>18</td>
                                    <td colSpan="6" style={{width: "482px"}}>Экран</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>19</td>
                                    <td colSpan="6" style={{width: "482px"}}>Экран</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>20</td>
                                    <td colSpan="6" style={{width: "482px"}}>Вторичная обмотка +</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>21</td>
                                    <td colSpan="6" style={{width: "482px"}}>SYNC IN-</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>22</td>
                                    <td colSpan="6" style={{width: "482px"}}>SYNC IN+</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>23</td>
                                    <td colSpan="6" style={{width: "482px"}}>SYNC OUT-</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>24</td>
                                    <td colSpan="6" style={{width: "482px"}}>SYNC OUT+</td>
                                </tr>
                            </tbody>
                        </table>

                        <p>Рис. 1 – Схема подключения блока</p>
                        <img style={{width: "400px"}} src="/assets/images/BDT/Scheme_bdt.png" alt=""/>
                        <p>Клеммы 5 и 6, а также 7 и 8 попарно соединены и могут использоваться при необходимости для удобства монтажа нескольких блоков.</p>
                        <p>Клеммы 9 и 10, а также 11 и 12 – аналоговые выходы блока, они могут быть сконфигурированы как вольтовые (Uout ±10 В) или токовые (Iout 4-20 мА).</p>
                        <p>Клеммы 1 и 2 – предназначены для предачи информации от блока к потребителю по двухпроводному интерфейсу RS-485.</p>
                        <p>Клеммы 21 и 22 – выходное синусоидальное напряжение возбуждения первичной обмотки.</p>
                        <p>Клеммы 13 и 14 (ERR) – выходы n-p-n транзистора оптопары «сухой контакт» нормальнозамкнутый, при этом «+» - коллектор, «–» - эмиттер.</p>
                        <p>Клеммы 23 и 24 – входное синусоидальное напряжение вторичный обмотки.</p>
                        <p>В случае, когда необходимо синхронизировать несколько преобразователей ЛП, предусмотрены клеммы 21-24. Следует подключать выходы 21, 22 задающего преобразователя к входам 23, 24 ведомого преобразователя.</p>
                        <h1>Инструкция по калибровке блока BDT-7 с датчиками серии LPS</h1>
                        <p>Данное руководство предназначено для ручной калибровки цифровых блоков BDT с датчиками серии LPS. Не рекомендуется производить данную калибровку самостоятельно.</p>
                        <p>Оборудование: <br></br>Цифровой блок BDT поддерживающий протокол MODBUS;<br></br> RS485-USB преобразователь;<br></br> ПК или ноутбук;<br></br> Набор концевых мер длин.</p>
                        <ul>
                            <li style={{listStyle: "auto"}}>
                                <p>Заходим в программу BDT-07 à в верхнем окне выбираем com-порт к которому подключен блок с преобразователем àнажимаем подключить</p>
                                <img src="/assets/images/BDT/bdt_collibr_1.png" alt=""/>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>При успешном подключении блока, в графах положение и предобработка появятся данные и будут обновляться. Период обновления данных выставляется в графе период.</p>
                                <img src="/assets/images/BDT/bdt_collibr_2.png" alt=""/>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Выставляем шток в нулевое положение (15 мм для датчиков с направленным штоком (DS), 25 мм для датчиков с ненаправленным штоком (FS)).</p>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Переходим во вкладку калибровка, нажимаем прочитать.</p>
                                <img src="/assets/images/BDT/bdt_collibr_3.png" alt=""/>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Вам отобразятся текущие настройки и калибровка блока.</p>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Значения «предобработки» записываются в окошки с последовательной нумерацией, в зависимости от шага. Для удобства можете просто нажать кнопку записать точку…, тогда значения предобработки переместиться в соответствующее окно.
Примечание! Если требуется откалибровать по 12-ти точкам то заполните поля начиная с первой по 12-тую точку. Если 11 тогда с первой по 11-тую, если 2 тогда только первую и вторую. В преобразовании учувствуют только точки, входящие в диапазон (если калибровка по 2-м точкам учитывается только, то что записано в окнах точка 1 и точка 2.</p>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Проводим калибровку с определенным шагом (шаг измерения представлен в таблице ниже в соответствии с диапазоном измерения).</p>
                                <table className={styles.table} style={{height: "auto", width: "100%", maxWidth: "550px"}}>
                                    <tbody>
                                        <tr>
                                            <td style={{width: "196px"}}>Диапазон</td>
                                            <td colSpan="6" style={{width: "482px"}}>Шаг</td>
                                            <td colSpan="6" style={{width: "482px"}}>Количество точек</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "196px"}}>20</td>
                                            <td colSpan="6" style={{width: "482px"}}>2</td>
                                            <td colSpan="6" style={{width: "482px"}}>11</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "196px"}}>110</td>
                                            <td colSpan="6" style={{width: "482px"}}>10</td>
                                            <td colSpan="6" style={{width: "482px"}}>12</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "196px"}}>150</td>
                                            <td colSpan="6" style={{width: "482px"}}>15</td>
                                            <td colSpan="6" style={{width: "482px"}}>11</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "196px"}}>220</td>
                                            <td colSpan="6" style={{width: "482px"}}>20</td>
                                            <td colSpan="6" style={{width: "482px"}}>12</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "196px"}}>250</td>
                                            <td colSpan="6" style={{width: "482px"}}>25</td>
                                            <td colSpan="6" style={{width: "482px"}}>11</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "196px"}}>330</td>
                                            <td colSpan="6" style={{width: "482px"}}>30</td>
                                            <td colSpan="6" style={{width: "482px"}}>12</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>Значения «предобработки» записываются в окошки с последовательной нумерацией, в зависимости от шага</p>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Нажимаем кнопку «Отправить и сохранить». Только после этого все точки будут сохранены на блоке, и он будет откалиброван с конкретным датчиком LPS.</p>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Для того чтобы убедится, что все настройки записаны верно нажмите кнопку «прочитать». Вам отобразятся текущие настройки.</p>
                            </li>
                            <li style={{listStyle: "auto"}}>
                                <p>Проверяем калибровку плавным перемещением датчика по точкам и следим за выходным сигналом.</p>
                            </li>
                        </ul>
                        <h1>Карта регистров</h1>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td style={{width: "196px"}}>Номер регистра</td>
                                    <td colSpan="6" style={{width: "482px"}}>Название</td>
                                    <td colSpan="6" style={{width: "482px"}}>Назначение</td>
                                    <td colSpan="6" style={{width: "482px"}}>Диапазон</td>
                                    <td colSpan="6" style={{width: "482px"}}>Значение по умолчанию</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>0</td>
                                    <td colSpan="6" style={{width: "482px"}}>Положение</td>
                                    <td colSpan="6" style={{width: "482px"}}>Данный регистр отображает актуальное положение  штока</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>-</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>1</td>
                                    <td colSpan="6" style={{width: "482px"}}>Предобработка</td>
                                    <td colSpan="6" style={{width: "482px"}}>В этом регистре отображаются значения до обработки. Во время калибровки нужно вписывать именно эти значения в регистры 2-13</td>
                                    <td colSpan="6" style={{width: "482px"}}>(-32767;32767)</td>
                                    <td colSpan="6" style={{width: "482px"}}>-</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>(2-13)</td>
                                    <td colSpan="6" style={{width: "482px"}}>Код калибровки</td>
                                    <td colSpan="6" style={{width: "482px"}}>Регистры для калибровки блока на каждую точку диапазона. В обработке участвуют значения начиная с первого до значения, указанного в регистре 25.</td>
                                    <td colSpan="6" style={{width: "482px"}}>(-32767;32767)</td>
                                    <td colSpan="6" style={{width: "482px"}}>0</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>15</td>
                                    <td colSpan="6" style={{width: "482px"}}>Модбас ID</td>
                                    <td colSpan="6" style={{width: "482px"}}>ID для протокола модбас</td>
                                    <td colSpan="6" style={{width: "482px"}}>(1;254)</td>
                                    <td colSpan="6" style={{width: "482px"}}>100</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>16</td>
                                    <td colSpan="6" style={{width: "482px"}}>BaudRate_ind</td>
                                    <td colSpan="6" style={{width: "482px"}}>ндикатор скорость передачи по модбаc 0-9600;1-19200;2-38400;3-57600;4-115200</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;4)</td>
                                    <td colSpan="6" style={{width: "482px"}}>4</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>17</td>
                                    <td colSpan="6" style={{width: "482px"}}>Сохранение</td>
                                    <td colSpan="6" style={{width: "482px"}}>Регистр для сохранения значений, при установки 1 контроллер сохраняет значения, выставляет в регистре значение 0 и перезагружается</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;1)</td>
                                    <td colSpan="6" style={{width: "482px"}}>0</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>18</td>
                                    <td colSpan="6" style={{width: "482px"}}>Диапазон измерения датчика</td>
                                    <td colSpan="6" style={{width: "482px"}}>Диапазон измерения датчика (не влияет на измерение)</td>
                                    <td colSpan="6" style={{width: "482px"}}>(10;1000)</td>
                                    <td colSpan="6" style={{width: "482px"}}>0</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>19</td>
                                    <td colSpan="6" style={{width: "482px"}}>Код максимума выходного сигнала AO(4-20мА)</td>
                                    <td colSpan="6" style={{width: "482px"}}>Код ЦАП, отвечающий за максимальное значение положения</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>64200 (20мА)</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>20</td>
                                    <td colSpan="6" style={{width: "482px"}}>Код минимума выходного сигнала  AO(4-20мА)</td>
                                    <td colSpan="6" style={{width: "482px"}}>Код ЦАП, отвечающий за минимальное значение положения</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>12900(4мА)</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>21</td>
                                    <td colSpan="6" style={{width: "482px"}}>Размах сигнала возбуждения</td>
                                    <td colSpan="6" style={{width: "482px"}}>Амплитуда сигнала возбуждения катушки датчика. (Размах + Смещение  должны быть меньше 65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>45000</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>22</td>
                                    <td colSpan="6" style={{width: "482px"}}>Смещение сигнала возбуждения</td>
                                    <td colSpan="6" style={{width: "482px"}}>Уровень смещения сигнала возбуждения  (Размах + Смещение  должны быть меньше 65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0;65534)</td>
                                    <td colSpan="6" style={{width: "482px"}}>20000</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>23</td>
                                    <td colSpan="6" style={{width: "482px"}}>Период генерации</td>
                                    <td colSpan="6" style={{width: "482px"}}>Период генерации в мс/100</td>
                                    <td colSpan="6" style={{width: "482px"}}>-</td>
                                    <td colSpan="6" style={{width: "482px"}}>20мс/100  (5кГц)</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>24</td>
                                    <td colSpan="6" style={{width: "482px"}}>Период обновления</td>
                                    <td colSpan="6" style={{width: "482px"}}>Период за который данные обновляются в буфере отправки</td>
                                    <td colSpan="6" style={{width: "482px"}}>-</td>
                                    <td colSpan="6" style={{width: "482px"}}>100 мс</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>25</td>
                                    <td colSpan="6" style={{width: "482px"}}>Количество точек калибровки</td>
                                    <td colSpan="6" style={{width: "482px"}}>Количество точек калибровки</td>
                                    <td colSpan="6" style={{width: "482px"}}>(2-12)</td>
                                    <td colSpan="6" style={{width: "482px"}}>2 количество точек калибровки</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>26</td>
                                    <td colSpan="6" style={{width: "482px"}}>Детектор обрыва</td>
                                    <td colSpan="6" style={{width: "482px"}}>Регистр управления детектора обрыва (0- детектор отключен; 1 -детектор первичной обмотки включен)</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0-1)</td>
                                    <td colSpan="6" style={{width: "482px"}}>1</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>27</td>
                                    <td colSpan="6" style={{width: "482px"}}>Индикатор обрыва</td>
                                    <td colSpan="6" style={{width: "482px"}}>Индикация обрыва. Выставляется 1 если сработал детектор обрыва</td>
                                    <td colSpan="6" style={{width: "482px"}}>(0-1)</td>
                                    <td colSpan="6" style={{width: "482px"}}>0</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>28</td>
                                    <td colSpan="6" style={{width: "482px"}}>Версия прошивки</td>
                                    <td colSpan="6" style={{width: "482px"}}>Версия прошивки блока</td>
                                    <td colSpan="6" style={{width: "482px"}}>-</td>
                                    <td colSpan="6" style={{width: "482px"}}>-</td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>29</td>
                                    <td colSpan="6" style={{width: "482px"}}></td>
                                    <td colSpan="6" style={{width: "482px"}}></td>
                                    <td colSpan="6" style={{width: "482px"}}></td>
                                    <td colSpan="6" style={{width: "482px"}}></td>
                                </tr>
                                <tr>
                                    <td style={{width: "196px"}}>30</td>
                                    <td colSpan="6" style={{width: "482px"}}>Коэффициент фильтрации</td>
                                    <td colSpan="6" style={{width: "482px"}}>Фильтрация в усл. Ед. Чем он больше тем быстрее реагирует система, и тем больше шумов проходит сквозь него</td>
                                    <td colSpan="6" style={{width: "482px"}}>(1-1000)</td>
                                    <td colSpan="6" style={{width: "482px"}}>200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                
            </div>
        </div>
    )
})

export default bdt_prod;