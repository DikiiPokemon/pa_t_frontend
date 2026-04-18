import styles from "@/components/BDT.module.css";
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
        "II = два выходных сигнала 4-20мА",
        "UU = два выходных сигнала ±10 В",
        "UI = один выходной сигнал ±10 В, второй 4-20мА",
        "NI = один выходной сигнал 4-20 мА",
        "NU = один выходной сигнал ±10 В",
    ]

    const Type = [  
        "BDT 07",
    ]

    const [num, setNum] = useState(1)

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

    const [fs_mods, setFs_mods] = useState([])

    async function  find_mods (){
        let el = productsStore.BDT.find(i => i.name === `FS ${diametr}`)

        const mods = await fetchModification(el.id)
        setFs_mods(mods)

    }


    useEffect(() => {
        // const realId = "FS " + diametr + " (" + long + ", " + signalType.split(" –")[0] + ", " + type.split(" =")[0] + ")"

        // console.log(fs_mods);
        

        // const fs_stock = fs_mods.find(i => i.name === realId)

        // if(!fs_stock) return setStock(0)

        // const quantity = productsStore.stock.find(i => i.assortmentId === fs_stock.id)

        // if(!quantity) return setStock(0)

        // setStock(quantity.stock)
    }, [signalType, type, fs_mods])


    useEffect(() => {
        setCartElem({
            prod_type: "FS",
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
            price: 0,
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
                <a>Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="">{"Электронные блоки"}</Link>
            </div>
            <div className={styles.calc_stock}>{stock} в наличии</div>

           <ToCard func={() => toCart()} num={num} increment={increment} decrement={decrement}/>
        </div>
    )
})

export default BDT_calc