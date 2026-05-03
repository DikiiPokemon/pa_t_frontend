"use client"
import styles from "@/components/Calc.module.css";
import Link from "next/link"
import RangePicker from "./range_picker"
import Selector from "./selector"
import { useEffect, useState } from "react"
import ToCard from "./To_card"
import { useStore } from "@/store/StoreContext";
import { observer } from "mobx-react-lite";

const LPS_calc = observer((props) => {

    const { productsStore } = useStore()

    const Range = [
        "0..7", "0..10", "0..15", "0..20", "0..25", "0..30", "0..50", "0..60", "0..70", "0..80", "0..90", "0..100", "0..110", "0..140", "0..150", "0..170", "0..220", "0..250", "0..330", "0..440 ", "0..550", "0..660"
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

    const [num, setNum] = useState(1)
    const [price, setPrice] = useState(0)

    function increment (){
        setNum(num + 1)
    }

    function decrement (){
        if(num > 1){
            setNum(num - 1)
        }
    }

    const [range, setRange] = useState(Range[0])
    const [execution, setExecution] = useState(Execution[0])
    const [type, setType] = useState(Type[0])
    const [cabele, setCable] = useState(0)

    const [cartElem, setCartElem] = useState({
        prod_type: "LPS",
        range: Range[0],
        execution: Execution[0],
        type: Type[0],
        cabele: 0,
    })

    const [stock, setStock] = useState(0)

    const [lps_mods, setLPS_mods] = useState([])

    async function  find_mods (){
        //Поиск id модификации
        let el = productsStore.LPS.find(i => i.name === `LPS (${range.split("..")[1]})`)
        
        const mods = await fetchModification(el.id)
        setLPS_mods(mods)
    }

    function find_price(){
        //Поиск цены модификации
        let index_price = 0;
        console.log(Range.length);
        Range.map((i, idx) => i === range ? index_price = index_price + 162 * idx : index_price)
        console.log(index_price);
        Execution.map(((i, idx) => i === execution ? index_price = index_price + 81 * idx : index_price))
        console.log(index_price);
        Type.map(((i, idx) => {
            if(i === type){
                if(idx === 1){
                    index_price = index_price + 40
                }else if(idx === 2){
                    index_price = index_price + 41
                }
            }
        }))
        console.log(index_price);
        if(Type[1] !== type){
            if(cabele < 3){
                index_price = Number(index_price) + Number(cabele)
            }else{
                index_price = Number(index_price) + Number(cabele) - 1 
            }
        }
        
        setPrice(productsStore.lps_prices[index_price])
        index_price = 0
    }

    useEffect(() => {
        const realId = "LPS (" + range.split("..")[1] + ") (" + type.split(" = ")[0] + ", " + execution.split(" = ")[0] + ")"
        

        const lps_stock = lps_mods.find(i => i.name === realId)

        props.setter("LPS-" + range.split("..")[1] + "-" + type.split(" = ")[0] + "-" + execution.split(" = ")[0])

        if(!lps_stock) return setStock(0)

        const quantity = productsStore.stock.find(i => i.assortmentId === lps_stock.id)

        if(!quantity) return setStock(0)

        setStock(quantity.stock)
    }, [range, execution, type, lps_mods])

    useEffect(() => {
        setCartElem({
            prod_type: "LPS",
            range: range,
            execution: execution,
            type: type,
            cabele: cabele,
        })
        
        find_price()
    }, [range, execution, type, cabele])

    useEffect(() => {
        if(productsStore.loaded){
            find_mods()
            find_price()
        }
    }, [range, productsStore.loaded])

    function toCart(){
        const prods = productsStore.Cart
        
        const product = {
            id: Object.values(cartElem).join("-"),
            number: num,
            price: price,
            url: "/assets/images/LPS/LPS.jpg",
        }

        
        if(prods.length === 0){
            productsStore.setCart([product])
            localStorage.setItem("cart", JSON.stringify([product]))

        }else{
            
            const existing = prods.find(item => item.id === product.id)

            if(existing) {
                
                const result = prods.map(item => item.id === product.id ? {...item, number: num} : item)
                productsStore.setCart(result)
                
                localStorage.setItem("cart", JSON.stringify(result))
                return
            }


            prods.push(product)
            productsStore.setCart(prods)
            
            
            localStorage.setItem("cart", JSON.stringify(prods))
            return
        }


    }

    return(
        <div className={styles.calc_wrapper}>
            <div className={styles.calc_measurments}>
                <p>Диапазон измерений</p>
                <Selector key={"LPS1"} arr={Range} select={range} setSelect={setRange}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Исполнение</p>
                <Selector key={"LPS2"} arr={Execution} select={execution} setSelect={setExecution}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Тип подключения</p>
                <Selector key={"LPS3"} arr={Type} select={type} setSelect={setType}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Длина кабеля</p>
                <RangePicker setter={setCable} getter={cabele}/>
            </div>

            <div className={styles.calc_description}>
                <p>Описание</p>
                <p>LVDT (линейный переменный дифференциальный трансформатор) представляет вид индуктивных преобразователей, предназначенных для применения в жестких, промышленных условиях, при высокой температуре и/или давлении, при больших ускорениях и большом числе циклов перемещений.</p>
                <a href="#full_descript">Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="/catalog#sens">{"Датчики"}</Link>
            </div>
            { stock === 0 ? 
            <div className={styles.calc_stock}>
                <span>Нет в наличии</span> (Можем реализовать под заказ)
            </div>
            :
            <div className={styles.calc_stock}>
                {stock} шт. в наличии
            </div>
            }

           <ToCard func={() => toCart()} num={num} increment={increment} decrement={decrement} price={price}/>
        </div>
    )
})

export default LPS_calc