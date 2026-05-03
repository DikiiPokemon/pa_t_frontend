import styles from "@/components/Calc.module.css";
import Link from "next/link"
import RangePicker from "./range_picker"
import Selector from "./selector"
import { useEffect, useState } from "react"
import ToCard from "./To_card"
import { productsStore } from "@/store/product_store";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreContext";
import { fetchModification } from "@/http/product_controll";


const BDT_calc = observer (() => {

    const { productsStore } = useStore()

    const signal =[
        "II = два выходных сигнала 4..20мА",
        "UU = два выходных сигнала ±10 В",
        "UI = один выходной сигнал ±10 В, второй 4..20мА",
        "NI = один выходной сигнал 4..20 мА",
        "NU = один выходной сигнал ±10 В",
    ]

    const Type = [  
        "BDT 07",
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



    const [cartElem, setCartElem] = useState({
        prod_type: "BDT",
        signalType: signal[0],
        type: Type[0],
    })

    const [signalType, setSignalType] = useState(signal[0])
    const [type, setType] = useState(Type[0])

    const [stock, setStock] = useState(0)

    const [bdt_mods, setBDT_mods] = useState([])

    async function  find_mods (){
        let el = productsStore.sensors.find(i => i.name === `Блок BDT`)
        console.log(el);
        
        const mods = await fetchModification(el.id)
        setBDT_mods(mods)

    }


    useEffect(() => {
        const realId = "Блок BDT (07, " + signalType.split(" = ")[0].split('')[0] + ", " + signalType.split(" = ")[0].split('')[1] + ")"

        
        

        const bdt_stock = bdt_mods.find(i => i.name === realId)
        console.log(bdt_mods);

        if(!bdt_stock) return setStock(0)

        const quantity = productsStore.stock.find(i => i.assortmentId === bdt_stock.id)

        if(!quantity) return setStock(0)

        setStock(quantity.stock)
    }, [signalType, type, bdt_mods])


    useEffect(() => {
        setCartElem({
            prod_type: "BDT",
            signalType: signalType,
            type: type,
        })

    }, [signalType, type])

    useEffect(() => {
        if(productsStore.loaded){
            find_mods()
        }
    }, [productsStore.loaded])


    function toCart(){
        const prods = productsStore.Cart
        
        const product = {
            id: Object.values(cartElem).join("-"),
            number: num,
            price: productsStore.sensors_prices,
            url: "/assets/images/BDT/BDT.jpg",
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
                <p>Исполнение:</p>
                <Selector key={"BDT3"} arr={Type} select={type} setSelect={setType}/>
            </div>
             <div className={styles.calc_measurments}>
                <p>Тип присоединения:</p>
                <Selector key={"BDT3"} arr={signal} select={signalType} setSelect={setSignalType}/>
            </div>

            <div className={styles.calc_description}>
                <p>Описание</p>
                <p>Блок BDT-07 предназначен для обработки сигнала с преобразователя линейных перемещений LVDT одновременно в токовый сигнал 4 – 20 мА и в сигнал напряжения ±10 В.</p>
                <a href="#full_descript">Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="/catalog#blocks">{"Электронные блоки"}</Link>
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

           <ToCard func={() => toCart()} num={num} increment={increment} decrement={decrement} price={productsStore.sensors_prices}/>
        </div>
    )
})

export default BDT_calc