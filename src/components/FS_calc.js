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


const FS_calc = observer ((props) => {

    const { productsStore } = useStore()
    const SignalType = [
       "A = аналоговый", "PP = push pull"
    ]

    const Diametr = [
        "12", "14", "18", "22"
    ]

    const Long =[
        "50",
        "120",
    ]

    const Type = [  
        "CA = встроенный кабель",
        "C1 = разъем",
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
        prod_type: "FS",
        signalType: SignalType[0],
        diametr: Diametr[0],
        long: Long[0],
        type: Type[0],
        cabele: 0,
    })

    const [signalType, setSignalType] = useState(SignalType[0])
    const [diametr, setDiametr] = useState(Diametr[0])
    const [long, setLong] = useState(Long[0])
    const [type, setType] = useState(Type[0])
    const [cabele, setCable] = useState(0)

    const [stock, setStock] = useState(0)

    const [fs_mods, setFs_mods] = useState([])

    async function  find_mods (){
        let el = productsStore.FS.find(i => i.name === `FS ${diametr}`)

        const mods = await fetchModification(el.id)
        setFs_mods(mods)

    }

    function find_price(){
        //Поиск цены модификации
        let index_price = 0;
        SignalType.map((i, idx) => i === signalType ? index_price = index_price + 328 * idx : index_price)
        Diametr.map(((i, idx) => i === diametr ? index_price = index_price + 82 * idx : index_price))
        Long.map(((i, idx) => i === long ? index_price = index_price + 41 * idx : index_price))
        Type.map(((i, idx) => {
            if(i === type){
                if(idx === 1){
                    index_price = index_price + 40
                }else if(idx === 2){
                    index_price = index_price + 41
                }
            }
        }))
        if(Type[1] !== type){
            if(cabele < 3){
                index_price = Number(index_price) + Number(cabele)
            }else{
                index_price = Number(index_price) + Number(cabele) - 1 
            }
        }
        
        setPrice(productsStore.fs_prices[index_price])
        index_price = 0
    }



    useEffect(() => {
        const realId = "FS " + diametr + " (" + long + ", " + signalType.split(" –")[0] + ", " + type.split(" =")[0] + ")"
        

        const fs_stock = fs_mods.find(i => i.name === realId)
        
        //props.setter("FS-" + diametr + "-" + long + "-" + signalType.split(" =")[0] + "-" + type.split(" =")[0])
        props.setter("FS-" + diametr + "-" + long + "-" + type.split(" =")[0])

        if(!fs_stock) return setStock(0)

        const quantity = productsStore.stock.find(i => i.assortmentId === fs_stock.id)

        if(!quantity) return setStock(0)

        setStock(quantity.stock)
    }, [signalType, diametr, long, type, fs_mods])


    useEffect(() => {
        setCartElem({
            prod_type: "FS",
            signalType: signalType,
            diametr: diametr,
            long: long,
            type: type,
            cabele: cabele,
        })


        find_price()

    }, [signalType, diametr, long, type, cabele])

    useEffect(() => {
        if(productsStore.loaded){
            find_mods()
            find_price()
        }
    }, [diametr, productsStore.loaded])


    function toCart(){
        const prods = productsStore.Cart
        
        const product = {
            id: Object.values(cartElem).join("-"),
            number: num,
            price: price,
            url: "/assets/images/FS/FS.jpg",
        }
        
        
        if(prods.length === 0){
            productsStore.setCart([product])
            localStorage.setItem("cart", JSON.stringify([product]))

        }else{
            
            const existing = prods.find(item => item.id === product.id)
            

            if(existing) {
                console.log(num);
                
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
                <p>Тип выходного сигнала:</p>
                <Selector key={"FS1"} arr={SignalType} select={signalType} setSelect={setSignalType}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Диаметр резьбы, мм:</p>
                <Selector key={"FS2"} arr={Diametr} select={diametr} setSelect={setDiametr}/>
            </div>
            <div className={styles.calc_measurments}>
                <p>Длина, мм:</p>
                <Selector key={"FS3"} arr={Long} select={long} setSelect={setLong}/>
            </div>
             <div className={styles.calc_measurments}>
                <p>Тип присоединения:</p>
                <Selector key={"FS3"} arr={Type} select={type} setSelect={setType}/>
            </div>
            <div className={styles.calc_measurments}>
                <label htmlFor="fs_range">Длина кабеля</label>
                <RangePicker id={"fs_range"} setter={setCable} getter={cabele}/>
            </div>

            <div className={styles.calc_description}>
                <p>Описание</p>
                <p>Высокочастотные датчики частоты вращения подходят для использования с зубчатым колесом из ферромагнитного материала для генерации сигналов пропорциональной частоты вращения.</p>
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

export default FS_calc