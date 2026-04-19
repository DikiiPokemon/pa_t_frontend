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


const BFS_calc = observer (() => {

    const { productsStore } = useStore()

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


    const [stock, setStock] = useState(0)
    const [cartElem, setCartElem] = useState({
        prod_type: "BFS",
    })

    const [bfs_mods, setBFS_mods] = useState([])

    async function  find_mods (){
        let el = productsStore.BDT.find(i => i.name === `Блок BFS`)

        // const mods = await fetchModification(el.id)
        // setBFS_mods(mods)
        const quantity = productsStore.stock.find(i => i.assortmentId === el.id)
        if(!quantity) return setStock(0)

        setStock(quantity.stock)
    }


    // useEffect(() => {
    //     const realId = "FS " + diametr + " (" + long + ", " + signalType.split(" –")[0] + ", " + type.split(" =")[0] + ")"

    //     console.log(fs_mods);
        

    //     const fs_stock = fs_mods.find(i => i.name === realId)

    //     if(!fs_stock) return setStock(0)

    //     const quantity = productsStore.stock.find(i => i.assortmentId === fs_stock.id)

    //     if(!quantity) return setStock(0)

    //     setStock(quantity.stock)
    // }, [bfs_mods])

    useEffect(() => {
        if(productsStore.loaded){
            find_mods()
            setPrice(productsStore.sensors_prices[0].replace(/,/g, ".").replace(/\s/g, '').replace('₽', ''))
        }
    }, [productsStore.loaded])


    function toCart(){
        const prods = productsStore.Cart
        
        const product = {
            id: Object.values(cartElem).join("-"),
            number: num,
            price: price,
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

            <div className={styles.calc_description}>
                <p>Описание</p>
                <p>Преобразователь сигналов измеряемых частот BFS-01 предназначен для формирования прямоугольного сигнала из входного синусоидального сигнала.</p>
                <a>Полное описание</a>
            </div>

            <div className={styles.calc_category}>
                <p>Категория:</p>
                <Link href="">{"Электронные блоки"}</Link>
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

export default BFS_calc