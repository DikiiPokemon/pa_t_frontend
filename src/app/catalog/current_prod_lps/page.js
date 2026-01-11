"use client";
import styles from "@/app/catalog/page.module.css";
import ProductCard from "@/components/product_card";
import { Suspense, useContext, useEffect, useState } from "react"
import { Context } from "../../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import LPS_calc from "@/components/LPS_calc";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";


const cur_prod = observer(() => {

    const [description, setDescription] = useState(1)

    function Model({ color = 'red', url}) {
        const { scene } = useGLTF(url)

        scene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone()
                child.material.color.set(color)
                
            }
        })

        return <primitive object={scene} position={[0, 0, 0]} rotation={[100, 1.5, 0]}/>
    }

    return(
        <div className={styles.product_page_wrapper}>
            <div className={styles.product_page_charachteristic_wrapper}>
                <div className={styles.product_page_charachteristic_img}>
                    <Canvas shadows style={{width: "100%", height: "100%"}} camera={{ position: [0, 1, 1], fov: 10}}>
                        <ambientLight intensity={0.1} />
                        <directionalLight
                            castShadow
                            position={[0, -3, 0]} // свет под объектом
                            intensity={1.5}
                            color="gray"
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                            shadow-camera-far={10}
                            shadow-camera-near={0.5}
                            shadow-camera-left={-5}
                            shadow-camera-right={5}
                            shadow-camera-top={5}
                            shadow-camera-bottom={-5}
                            shadow-mapSize={[1024, 1024]} />
                        <meshStandardMaterial color={0xeaeff0} />
                        <Suspense fallback={null}>
                            <Model color="gray" url="/assets/3d/11.gltf" />
                        </Suspense>
                        <ContactShadows
                            position={[0, -0.05, 0]}
                            opacity={1}
                            scale={1}
                            blur={2}
                            far={1}
                        />
                        <OrbitControls/>
                    </Canvas>
                </div>
                <div className={styles.product_page_charachteristic_container}>
                    <LPS_calc/>
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
                        <h2 className={styles.product_page_description_main_header}>Основные технические характеристики</h2>
                        <ul>
                            <li>Диапазоны измерений от 7 до 660 мм</li>
                            <li>Встроенный кабель или разъемный соединитель</li>
                            <li>Срок службы до 100 млн. движений</li>
                            <li>Двусторонний гибкий или односторонний направленный выдвижной шток</li>
                            <li>Линейность до ±0,1 % диапазона</li>
                            <li>Температура до 125 градусов Цельсия</li>
                            <li>Степень защиты IP 67</li>
                            <li>Дублированный выходной аналоговый ±10 В или 4-20 мА</li>
                            <li>Возможно исполнение на заказ</li>
                        </ul>
                    </div>
                }
                {description === 2 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Документация</h1>
                        <ul>
                            <li><a href="" target="_blank">Техническая спецификация</a></li>
                            <li><a href="" target="_blank">Руководство по эксплуатации</a></li>
                            <li><a href="" target="_blank">Технические условия</a></li>
                            <li><a href="" target="_blank">Модели_STL</a></li>
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

export default cur_prod;