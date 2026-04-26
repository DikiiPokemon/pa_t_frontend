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
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';


const cur_prod = observer(() => {

    const [description, setDescription] = useState(1)
    const [mod, setMod] = useState("")

    function Model({ color = '#eaeff0', url }) {
        const [model, setModel] = useState(null);
    
            useEffect(() => {
                if (!url) return;
    
                const loader = new GLTFLoader();
                let isMounted = true;
    
                loader.load(
                url,
    
                // ✅ успех
                (gltf) => {
                    if (!isMounted) return;
    
                    const scene = gltf.scene.clone();
    
                    scene.traverse((child) => {
                    if (child.isMesh) {
                        child.material = child.material.clone();
                        child.material.color.set(color);
                    }
                    });
    
                    setModel(scene);
                },
    
                // ⏳ прогресс (можно убрать)
                undefined,
    
                // ❌ ошибка
                (error) => {
                    console.error('Ошибка загрузки модели:', error);
    
                    if (!isMounted) return;
    
                    // fallback — красный куб
                    const geometry = new THREE.BoxGeometry();
                    const material = new THREE.MeshStandardMaterial({ color: 'red' });
                    const cube = new THREE.Mesh(geometry, material);
    
                    setModel(cube);
                }
                );
    
                // 🧹 cleanup (ВАЖНО)
                return () => {
                isMounted = false;
                setModel(null);
                };
            }, [url, color]);
    
        if (!model) return null;
    
        return (
            <primitive
            object={model}
            position={[0, 0, 0]}
            rotation={[100, 1.5, 0]}
            />
        );
    }

    useEffect(() => {
        console.log(mod);
        
    }, [mod])
    
    return(
        <div className={styles.product_page_wrapper}>
            <div className={styles.product_page_header}>Датчики LPS</div>
            <div className={styles.product_page_charachteristic_wrapper}>
                <div className={styles.product_page_charachteristic_3d}>
                    <Canvas shadows style={{width: "100%", height: "100%"}} camera={{ position: [0, 1, 1], fov: 10}}>
                        <ambientLight intensity={0.1} />
                        <directionalLight
                            castShadow
                            position={[0, -3, 0]} // свет под объектом
                            intensity={1.5}
                            color="gray"
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                            shadow-camera-far={1}
                            shadow-camera-near={0.5}
                            shadow-camera-left={-5}
                            shadow-camera-right={5}
                            shadow-camera-top={5}
                            shadow-camera-bottom={-5}
                            shadow-mapSize={[1024, 1024]} />
                        <meshStandardMaterial color={0xeaeff0} />
                            <Model color="gray" url={`/assets/3d/LPS/${mod}.gltf`} />
                        <ContactShadows
                            position={[0, -0.7, 0]}
                            opacity={1}
                            scale={1}
                            blur={2}
                            far={1}
                        />
                        <OrbitControls/>
                    </Canvas>
                </div>
                <div className={styles.product_page_charachteristic_container_3d}>
                    <LPS_calc setter={setMod}/>
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