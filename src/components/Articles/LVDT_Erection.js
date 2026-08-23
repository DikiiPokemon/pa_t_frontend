"use client";
import styles from "@/components/Articles/Article.module.css";
import t_styles from "@/app/catalog/page.module.css";
import Image from "next/image";
import { useState } from "react";

export default function LVDT_Erection() {


  
  return (
    <div className={styles.article_wrapper}>
      <div className={styles.article_container}>
        <h1>Порядок монтажа датчиков LVDT</h1>
        <p>Монтаж датчиков может осуществляться с помощью двух методов крепления: с использованием хомутов или на шарнирные головки.</p>
        <p>При монтаже датчика не допускается вращение заглушек, откручивание шарнирной головки на штоке, кабельного ввода или разъема.</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection1.png"} alt="" width={300} height={300}></Image>
            <Image src={"/assets/images/LPS/Erection2.png"} alt="" width={300} height={300}></Image>
            <Image src={"/assets/images/LPS/Erection3.png"} alt="" width={300} height={300}></Image>
            <Image src={"/assets/images/LPS/Erection4.png"} alt="" width={300} height={300}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 1 – Указание мест на датчиках LPS которые запрещаются к вращению</p>
        <div className={styles.img_container}><Image src={"/assets/images/LPS/Erection5.png"} alt="" width={700} height={300}></Image></div>
        <p style={{textAlign: "center"}}>Рис. 2 – Запрещается крутить проушину, установленную на штоке</p>
        <p>Нулевое положение составляет 25 мм. для ненаправленного датчика и 15 мм. для направленного датчика.</p>
        <div className={styles.img_container}><Image src={"/assets/images/LPS/Erection6.png"} alt="" width={700} height={300}></Image></div>
        <p style={{textAlign: "center"}}>Рис. 3 – Графическое указание нулевой точки для датчика со свободным штоком (А) и направленным штоком (Б)</p>
        <h1>Монтаж с использованием хомутов</h1>
        <p>Данный тип монтажа возможен для любого исполнения датчиков.</p>
        <p>В комплектацию поставки могут быть приложены трубные хомуты из металла или пластика. Данный способ крепления может применяться при стационарном монтаже датчика на подготовленную базу с использованием крепежа М6.</p>
        <p>При использовании хомутов датчик помещается в отверстие между двумя составными частями и зажимается. Шток при этом крепится к подвижной части оборудования, линейное перемещение, которого необходимо отслеживать.</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection7.png"} alt="" width={500} height={300}></Image>
            <Image src={"/assets/images/LPS/Erection8.png"} alt="" width={500} height={300}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 4 – Пример монтажа с использованием хомутов.</p>
        <h1>Монтаж с использованием шарнирных головок</h1>
        <p>Данный тип монтажа доступен только для датчиков с направленным штоком.</p>
        <p>При использовании монтажа за шарнирные головки, одна головка крепится к неподвижной части оборудования, а вторая к подвижной части оборудования, линейное перемещение, которого необходимо отслеживать.</p>
        <p>Монтаж должен осуществляться с помощью двух кузовных шайб М8 и гайки М8 с использованием фиксатора резьбы или самостопорящейся гайки М8.</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection9.png"} alt="" width={500} height={300}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 5 – Пример монтажа с использованием шарнирных головок.</p>
        <p>При монтаже датчика допускается вращение шарнирной головки, которая крепится к неподвижной части оборудования, для регулировки необходимого расстояния, после чего ее необходимо законтрить гайкой. При затягивании гайки задней проушины необходимо придерживать заглушку ключом на 14.</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection10.png"} alt="" width={500} height={300}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 6 – Указание места настраиваемой проушины.</p>
        <p>Не допускается установка датчика с перекосом штока относительно движения оборудования:</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection11.png"} alt="" width={500} height={300}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 7 –  Здесь указан пример неверного горизонтального монтажа и верного (отмечен оранжевой линией) монтажа преобразователя ЛП, для вертикального монтажа действует аналогичное правило.</p>
        <p>При горизонтальном или вертикальном движении штока датчик перемещения должен находиться строго соосно с движением.</p>
        <p>Не допускается установка датчика со смещением штока в сторону относительно движения оборудования:</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection12.png"} alt="" width={150} height={500}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 8 –  Здесь показан пример неверного вертикального монтажа (отмечен красной линией) и верного (отмечен оранжевой линией) монтажа преобразователя ЛП, для горизонтального монтажа действует аналогичное правило.</p>
        <p>Так же не допускается ограничение вращения корпуса на проушинах с использованием защитных кожухов, защитных экранов, привязыванию к оборудованию за выступающие детали датчика.</p>
        <p>Минимально допустимое расстояние между датчиками, установленными параллельно, составляет 200 мм.</p>
        <div className={styles.img_container}>
            <Image src={"/assets/images/LPS/Erection13.png"} alt="" width={500} height={300}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 9 –   Минимальная удаленность датчиков при параллельной установке.</p>
        <h1>Подключение к блоку</h1>
        <div className={styles.img_container}>
            <Image src={"/assets/images/BDT/Scheme_bdt.webp"} alt="" width={500} height={700}></Image>
        </div>
        <p style={{textAlign: "center"}}>Рис. 10 – Стандартная схема подключения блока BDT-07-II</p>
        <ul>
            <li>Подключите Первичная обмотка + к контакту 16, а первичная обмотка – к контакту 15.</li>
            <li>Подключите Вторичная обмотка + к контакту 20, Экран к контакту 18, Вторичная обмотка – к контакту 17.</li>
            <li>Убедитесь, что подключаете преобразователь к нужному блоку сравнив маркировку на преобразователе и обратной стороне блока – заводские номера должны совпадать.</li>
            <li>Подключите блок к питанию используя контакты 5 и 7 или 6 и 8.</li>
            <li>Подключите мультиметр или другое измерительное устройство к выходу 1 используя контакты 9 и 11.</li>
            <li>Подключите мультиметр или другое измерительное устройство к выходу 2 используя контакты 10 и 12.</li>
            <li>Убедитесь,что лампа “ошибка” на блоке не горит, показания с токовых выходов изменяются в пределах 4-20 мА ± 1%, а с вольтовых выходов в пределах -10 + 10 В, ± 1%.</li>
        </ul>
        <h1>Назначение контактов соединителей</h1>
        <table className={t_styles.table} style={{height: "auto", width: "100%"}}>
            <tbody>
                <tr>
                    <td style={{width: "196px"}}>№ клеммы</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Цепь</td>
                    <td colSpan="3" rowSpan={17} style={{textAlign:"center", verticalAlign: "middle"}}><img src="/assets/images/BDT/table_klem.webp" alt=""/></td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>1</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>B (RS485)</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>2</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>A (RS485)</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>3</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>TRM</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>4</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>NC</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>5</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>+24 В</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>6</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>+24 В</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>7</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>0 В</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>8</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>0 В</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>9</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Uout ±10В/Iout 4-20mA</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>10</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Общ. OUT</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>11</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Uout ±10В/Iout 4-20mA</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>12</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Общ. OUT</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>13</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>+ ERR</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>14</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>- ERR</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>15</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Первичная обмотка –</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>16</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Первичная обмотка +</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>17</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Вторичная обмотка –</td>
                    <td colSpan="1">№</td>
                    <td colSpan="1">Назначение</td>
                    <td style={{minWidth: "100px"}} colSpan="1" rowSpan="5"><img src="/assets/images/LPS/Erection14.png" alt=""/></td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>18</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Экран</td>
                    <td colSpan="1">1</td>
                    <td colSpan="1">Первичная обмотка + (коричневый)</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>19</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Экран</td>
                    <td colSpan="1">2</td>
                    <td colSpan="1">Первичная обмотка – (белый)</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>20</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>Вторичная обмотка +</td>
                    <td colSpan="1">3</td>
                    <td colSpan="1">Вторичная обмотка + (желтый)</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>21</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>SYNC IN-</td>
                    <td colSpan="1">4</td>
                    <td colSpan="1">Вторичная обмотка – (зеленый)</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>22</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>SYNC IN+</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>23</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>SYNC OUT-</td>
                </tr>
                <tr>
                    <td style={{width: "196px"}}>24</td>
                    <td colSpan="6" style={{width: "482px", minWidth: "100px"}}>SYNC OUT+</td>
                </tr>
            </tbody>
        </table>
        <p>Клеммы 15 и 16 – выходное синусоидальное напряжение возбуждения первичной обмотки.</p>
        <p>Клеммы 5 и 6, а также 7 и 8 попарно соединены и могут использоваться при необходимости для удобства монтажа нескольких блоков.</p>
        <p>Клеммы 13 и 14 (ERR) – выходы n-p-n транзистора оптопары «сухой контакт», при этом «+» - коллектор, «-» - эмиттер.</p>
        <h1>Возможные ошибки при подключении и их причины</h1>
        <table className={t_styles.table} style={{height: "auto", width: "100%"}}>
            <tbody>
                <tr>
                    <td colSpan="2" style={{width: "200px", minWidth: "150px"}}>Неисправности</td>
                    <td colSpan="3" style={{width: "100%"}}>Возможные ошибки и их исправление</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{width: "200px", minWidth: "150px"}}>Горит сигнал ошибка на блоке</td>
                    <td colSpan="3" style={{width: "100%"}}>Проверьте подключение первичной и вторичной обмоток датчика к блоку</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{width: "200px", minWidth: "150px"}}>Показания с выходов блока не соответствуют заявленным в паспорте</td>
                    <td colSpan="3" style={{width: "100%"}}>Проверьте, что экран подключен, длина кабеля соответствует длине кабеля, указанной в модификации датчика, не перепутаны местами + и – вторичной обмотки, а также выбраны нужные блок с датчиком(п.3 подключение к блоку)</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}