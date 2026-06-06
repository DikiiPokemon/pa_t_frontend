"use client";
import styles from "@/app/catalog/page.module.css";
import ProductCard from "@/components/product_card";
import { Suspense, useContext, useEffect, useMemo, useState } from "react"
import { Context } from "../../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import LPS_calc from "@/components/LPS_calc";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import FS_calc from "@/components/FS_calc";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import Arrow from "@/components/assets/Arrow_down.svg"
import Image from "next/image";
import * as THREE from 'three';


const cur_prod = observer(() => {

    const slider = [
        "/assets/images/FS/FS_sl1.png", "/assets/images/FS/FS_sl2.png", "/assets/images/FS/FS_sl3.png", "/assets/images/FS/FS_sl4.png"
    ]

    const [description, setDescription] = useState(1)
    const [mod, setMod] = useState("")

    const [error, setError] = useState(false)

     const[activeBlock, setActiveBlock] = useState(0)
    const[Xtarns, setXtrans] = useState(0)
    const dynamicStyle = {
        translate: Xtarns, // Dynamic value from state
    };

    function inc_slider () {
        if(activeBlock === slider.length){
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
            
        setXtrans(`-${100 / ( slider.length + 1) * activeBlock}%`)
        
    }, [activeBlock])

    function Model({ color, url }) {
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

                const box = new THREE.Box3().setFromObject(scene);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                // 👉 двигаем саму модель ВНУТРИ
                scene.position.sub(center);

                // мягкий общий свет
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
                scene.add(ambientLight);

                // направленный свет
                const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
                directionalLight.position.set(5, 10, 7);
                const fillLight = new THREE.DirectionalLight(0xffffff, 1);
                fillLight.position.set(-5, 3, -5);

                scene.add(fillLight);

                scene.add(directionalLight);

                scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(color);

                    // убираем металлический эффект
                    child.material.metalness = 0;

                    // делаем материал матовым
                    child.material.roughness = 1;

                    // сообщаем Three.js обновить материал
                    child.material.needsUpdate = true;
                    // if (Array.isArray(child.material)) {
                    //     child.material = child.material.map((mat) => {
                    //         const m = mat.clone();
                    //         m.map = null;
                    //         m.color.set(color);
                    //         return m;
                    //     });
                    // }
                }
                });

                setError(false)

                setModel(scene);
            },

            // ⏳ прогресс (можно убрать)
            undefined,

            // ❌ ошибка
            (error) => {
                console.error('Ошибка загрузки модели:', error);
                setError(true)
                loader.load(
                "/assets/3d/FS/FS-12-50-C1.gltf",
    
                // ✅ успех
                (gltf) => {
                    if (!isMounted) return;

                    const scene = gltf.scene.clone();

                    const box = new THREE.Box3().setFromObject(scene);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());

                    // 👉 двигаем саму модель ВНУТРИ
                    scene.position.sub(center);

                    // мягкий общий свет
                    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
                    scene.add(ambientLight);

                    // направленный свет
                    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
                    directionalLight.position.set(5, 10, 7);
                    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
                    fillLight.position.set(-5, 3, -5);

                    scene.add(fillLight);

                    scene.add(directionalLight);
                    


                    scene.traverse((child) => {
                        if (child.isMesh) {
                            child.material.color.set(color);

                            // убираем металлический эффект
                            child.material.metalness = 0;

                            // делаем материал матовым
                            child.material.roughness = 1;

                            // сообщаем Three.js обновить материал
                            child.material.needsUpdate = true;

                            // child.geometry.computeBoundingBox();
                            // if (Array.isArray(child.material)) {
                            //     child.material = child.material.map((mat) => {
                            //         const m = mat.clone();
                            //         m.map = null;
                            //         m.color.set(color);
                            //         console.log(color);
                                    
                            //         return m;
                            //     });
                            // }
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
                    // const geometry = new THREE.BoxGeometry();
                    // const material = new THREE.MeshStandardMaterial({ color: 'red' });
                    // const cube = new THREE.Mesh(geometry, material);

                    const fallback = createImageFallback();
                    setModel(fallback);
                }
                );
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
       <group rotation={[- Math.PI / 4, 1.5, 0]}>
            <primitive
                object={model}
                position={[0, 0, 0]}
            />
        </group>
    );
}


    useEffect(() => {
        console.log(mod);
        
    }, [mod])

    return(
        <div className={styles.product_page_wrapper}>
            <div className={styles.product_page_header}>Датчики FS</div>
            <div className={styles.product_page_charachteristic_wrapper}>
                <div className={styles.product_page_charachteristic_img}>
                    <div className={styles.product_page_slider_wrapper}>
                        <div className={styles.product_page_slider_container} style={dynamicStyle}>
                            <div className={styles.product_page_charachteristic_3d}>
                                <Canvas shadows style={{width: "100%", height: "100%"}} camera={{ position: [0, 1, 0], fov: 10}}>
                                    <ambientLight intensity={0.1} />
                                    <directionalLight
                                        castShadow
                                        position={[-2, 3, 0]} // свет под объектом
                                        intensity={0.5}
                                        color="#eaeff0"
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
                                    
                                    <Model color="#9D9D9C" url={`/assets/3d/FS/${mod}.gltf`} />
                                    
                                    <ContactShadows
                                        position={[0, -0.01, 0]}
                                        opacity={1}
                                        scale={1}
                                        blur={2}
                                        far={1}
                                    />
                                    <OrbitControls/>
                                </Canvas>
                                {
                                error && 
                                    <div className={styles.error}>Не найдена модель данной конфигурации, была загружена конфигурация FS-12-50-C1</div>
                                }
                            </div>

                            {slider.map((i, idx) => {
                                return(
                                    <div key={i + idx} className={styles.product_page_slider_item}><Image alt="Датчик FS" width={600} height={600} src={i}/></div>
                                )
                            })

                            }
                        </div>
                    </div>
                    <button onClick={() => dec_slider()} className={`${styles.product_card_to_prod} `}><Image alt="Кнопка слайдера назад" src={Arrow}></Image></button>
                    <button onClick={() => inc_slider()} className={`${styles.product_card_to_prod} `}><Image alt="Кнопка слайдера вперед" src={Arrow}></Image></button>
                </div>
                
                <div className={styles.product_page_charachteristic_container_3d}>
                    <FS_calc setter={setMod}/>
                </div>
               
            </div>
            <div id="full_descript" className={styles.product_page_description}>
                <div className={styles.product_page_description_nav}>
                    <button onClick={() => setDescription(1)} className={`${styles.product_page_description_nav_button} ${description === 1 ? styles.Active : ""}`}>Описание</button>
                    <button onClick={() => setDescription(2)} className={`${styles.product_page_description_nav_button} ${description === 2 ? styles.Active : ""}`}>Документация</button>
                    <button onClick={() => setDescription(3)} className={`${styles.product_page_description_nav_button} ${description === 3 ? styles.Active : ""}`}>Сертификаты и декларации</button>
                </div>
                {description === 1 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Описание</h1>
                            <p>Высокочастотные датчики частоты вращения подходят для использования с зубчатым колесом из феромагнитного материала для генерации сигналов пропорциональной частоты вращения.</p>
                        <h2 className={styles.product_page_description_main_header}>Основные технические характеристики</h2>
                        <ul>
                            <li>Диапазон измерений частоты вращения, от 2 до 16000 Гц</li>
                            <li>Встроенный кабель или разъемный соединитель</li>
                            <li>Наработка на отказ, часы, не менее 100 тыс. часов</li>
                            <li>Пределы допускаемой относительной погрешности измерений частоты вращения, ±0,1 %</li>
                            <li>Выходной сигнал Аналоговый или PushPull</li>
                            <li>Температура до 125 градусов Цельсия</li>
                            <li>Степень защиты IP 67</li>
                            <li>Возможно исполнение на заказ</li>
                        </ul>
                        <table className={styles.table} style={{height: "fit-content", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Наименование характеристики</td>
                                    <td width="100%">Значение характеристики для модификации FS-A-12, FS-A-22</td>
                                    <td width="100%">Значение характеристики для модификации FS-PP-12</td>
                                    <td width="100%">Значение характеристики для модификации FS-PP-22</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" width="100%" style={{textAlign: "center"}}><strong>Метрологические характеристики</strong></td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Диапазон измерений частоты вращения, Гц</td>
                                    <td width="100%">от 2 до 16000</td>
                                    <td width="100%">от 2 до 16000</td>
                                    <td width="100%">от 2 до 16000</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Пределы допускаемой относительной погрешности измерений частоты вращения, %</td>
                                    <td width="100%">± 0,1</td>
                                    <td width="100%">± 0,1</td>
                                    <td width="100%">± 0,1</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" width="100%" style={{textAlign: "center"}}><strong>Технические характеристики</strong></td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Диапазон выходного сигнала</td>
                                    <td width="100%">от 0.2 до 30 В</td>
                                    <td width="100%">24 В</td>
                                    <td width="100%">24 В</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Номинальное напряжение питания, В</td>
                                    <td width="100%">–</td>
                                    <td width="100%">24</td>
                                    <td width="100%">24</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Ток потребления, мА, не более</td>
                                    <td width="100%">6</td>
                                    <td width="100%">40</td>
                                    <td width="100%">40</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Время установления рабочего режима, с, не более</td>
                                    <td width="100%">1</td>
                                    <td width="100%">1</td>
                                    <td width="100%">1</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Режим работы</td>
                                    <td width="100%">Непрерывный</td>
                                    <td width="100%">Непрерывный</td>
                                    <td width="100%">Непрерывный</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Электрическая прочность изоляции между жилами кабеля и корпусом датчика, Вэфф, не менее:</td>
                                    <td width="100%">500</td>
                                    <td width="100%">300</td>
                                    <td width="100%">300</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>
                                        Сопротивление изоляции между жилами кабеля и корпусом, МОм, не менее:<p></p>
                                        <p> в нормальных условиях эксплуатации</p> 
                                        <p>при повышенной влажности</p>  
                                        <p>при повышенной температуре</p>
                                    </td>
                                    <td width="100%"><br></br>
                                        <p>20</p>
                                        <p>1</p>
                                        <p>5</p>
                                    </td>
                                    <td width="100%"><br></br>
                                        <p>20</p>
                                        <p>1</p>
                                        <p>5</p> 
                                    </td>
                                    <td width="100%"><br></br>
                                        <p>20</p>
                                        <p>1</p>
                                        <p>5</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Порог срабатывания при защите от переполюсовки и импульсного<p></p>
                                    <p>перенапряжения, В</p></td>
                                    <td width="100%">30</td>
                                    <td width="100%">30</td>
                                    <td width="100%">30</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" width="100%" style={{textAlign: "center"}}><strong>Характеристики устойчивости к внешним воздействиям</strong></td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Температура окружающего воздуха</td>
                                    <td width="100%">От -40 до 125<sup> 0</sup>С</td>
                                    <td width="100%">От -20 до 85<sup> 0</sup>С</td>
                                    <td width="100%">От -20до 85<sup> 0</sup>С</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Барометрическое давление</td>
                                    <td width="100%">от 84,0 до 106,7 кПа</td>
                                    <td width="100%">от 84,0 до 106,7 кПа</td>
                                    <td width="100%">от 84,0 до 106,7 кПа</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Уровень взрывозащиты</td>
                                    <td width="100%">Zone 2 IIB</td>
                                    <td width="100%">Zone 2 IIB</td>
                                    <td width="100%">Zone 2 IIB</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Относительная влажность воздуха</td>
                                    <td width="100%">до 90 % при температуре 30 ºС;</td>
                                    <td width="100%">до 90 % при температуре 30 ºС;</td>
                                    <td width="100%">до 90 % при температуре 30 ºС;</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Степень защиты</td>
                                    <td width="100%">IP 67</td>
                                    <td width="100%">IP 67</td>
                                    <td width="100%">IP 67</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" width="100%" style={{textAlign: "center"}}><strong>Характеристики надежности</strong></td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Наработка на отказ, часы, не менее</td>
                                    <td width="100%">250000</td>
                                    <td width="100%">100000</td>
                                    <td width="100%">100000</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Средний срок службы, лет, не менее</td>
                                    <td width="100%">25</td>
                                    <td width="100%">10</td>
                                    <td width="100%">10</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}}>Средний срок хранения, лет, не менее</td>
                                    <td width="100%">2</td>
                                    <td width="100%">2</td>
                                    <td width="100%">2</td>
                                </tr>
                                <tr>
                                    <td width="100%" style={{maxWidth: "303px"}} >Вероятность безотказной работы, не менее</td>
                                    <td width="100%">0,98</td>
                                    <td width="100%">0,95</td>
                                    <td width="100%">0,95</td>
                                </tr>
                            </tbody>
                        </table>
                    <p>Марка ферромагнитного материала измерительного колеса не регламентируется. Модуль колеса должен быть не менее 2 мм (толщина зуба не менее 3 мм, высота зуба не менее 3 мм, ширина впадины не менее 3 мм). Толщина колеса не менее 3 мм.</p>
                    <p>Для исполнений СЕРИИ FS-PP уровень логического «0» менее 0.5 В, уровень логической «1» более 10 В.</p>
                    <p>Для исполнений СЕРИИ FS-A уровень логического «0» менее 0.1 В, уровень логической «1» более 0.4 В.</p>
                    <p>Для этой модификации рекомендуется использовать блок BFM-04F, предназначенный для формирования нормированного прямоугольного сигнала скважностью 50% из входного синусоидального сигнала.</p>
                    <p>Блок имеет 1 гальванически изолированный канал преобразования, на вход которого подается синусоидальный сигнал с амплитудой от 0,2 до 50В.</p>
                    <p>На выходе формируются прямоугольные импульсы амплитудой 24В.</p>
                    <h2>Код заказа датчика</h2>
                    <img style={{maxWidth: "637px", width: "100%"}} src="/assets/images/FS/code_fs.png" alt=""></img>
                    <p>Пример для аналогового датчика с кабелем 10 метров: FS-A-12-120-CA-10</p>
                    <p>Есть решения по аналогам датчиков скорости производства General electric, Braun, Jaquet и TE connectivity</p>
                    <h2>Габаритные и присоединительные размеры</h2>
                    <p>Исполнение М12</p>
                    <img src="/assets/images/FS/gab_fs.png" alt="" style={{maxWidth: "368px", width: "100%"}}/>
                </div>
                }
                {description === 2 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Документация</h1>
                        <ul>
                            <li><a href="/assets/docs/fs/tehnicheskaya-speczifikacziya.pdf" download>Техническая спецификация</a></li>
                            <li><a href="/assets/docs/fs/rukovodstvo-po-ekspluataczii.pdf" download>Руководство по эксплуатации</a></li>
                            <li><a href="/assets/docs/fs/tehnicheskie-usloviya.pdf" download>Технические условия</a></li>
                            <li><a href="/assets/docs/fs/pasport.pdf" download>Паспорт</a></li>
                        </ul>
                    </div>
                }
                {description === 3 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Сертификаты</h1>
                        <h2 className={styles.product_page_description_main_header}>ЕАЭС, электромагн.совм.020/2011</h2>
                        <ul>
                            <li><a href="/assets/docs/fs/№8-vypiska-po-deklaraczii-o-sootvetstvii-№-eaes-n-ru-d-ru.ra06.v.29253_23-ot-2023-11-16.pdf" download>Декларация</a></li>
                            <li><a href="/assets/docs/fs/№6-protokol-ispytanij-eaes-pa-t-fs-nsk.pdf" download>Протокол</a></li>
                        </ul>
                        <ul>
                            <li><a href="/assets/docs/fs/fs-sertifikat-si.pdf" download>Сертификат об утверждении типа средств измерений</a></li>
                        </ul>
                    </div>
                }
                
            </div>
            
        </div>
    )
})

export default cur_prod;