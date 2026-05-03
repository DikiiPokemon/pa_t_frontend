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

    function createImageFallback() {
        const texture = new THREE.TextureLoader().load('/assets/images/LPS/LPS.jpg');

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true, // если есть прозрачность
        });

        const geometry = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    function Model({ color = 'red', url }) {
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

                    // масштаб
                    const maxDim = Math.max(size.x, size.y, size.z);
                    scene.scale.setScalar(1 / maxDim);

                    const axesHelper = new THREE.AxesHelper(1); // длина осей
                    scene.add(axesHelper);
                    


                    scene.traverse((child) => {
                        if (child.isMesh) {
                            child.geometry.computeBoundingBox();
                            if (Array.isArray(child.material)) {
                                child.material = child.material.map((mat) => {
                                    const m = mat.clone();
                                    m.map = null;
                                    m.color.set(color);
                                    console.log(color);
                                    
                                    return m;
                                });
                            }
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
    
                // 🧹 cleanup (ВАЖНО)
                return () => {
                isMounted = false;
                setModel(null);
                };
            }, [url, color]);
    
        if (!model) return null;
    
        return (
            <group rotation={[- Math.PI / 3, 1.5, 0]}>
                <primitive
                    object={model}
                    position={[0, 0.5, 0]}
                />
            </group>
            
        );
    }
    
    return(
        <div className={styles.product_page_wrapper}>
            <div className={styles.product_page_header}>Датчики LPS</div>
            <div className={styles.product_page_charachteristic_wrapper}>
                <div className={styles.product_page_charachteristic_3d}>
                    <Canvas shadows style={{width: "100%", height: "100%"}} camera={{ position: [0, 1, 0], fov: 70}}>
                        <ambientLight intensity={0.1} />
                        <directionalLight
                            castShadow
                            position={[0, 5, 0]} // свет под объектом
                            intensity={1.5}
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
                        <meshStandardMaterial color={"#eaeff0"} />
                            <Model color="#FF2F55" url={`/assets/3d/LPS/${mod}.gltf`} />
                        <ContactShadows
                            position={[0, -0.1, 0]}
                            opacity={1}
                            scale={5}
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
            <div id="full_descript" className={styles.product_page_description}>
                <div className={styles.product_page_description_nav}>
                    <button onClick={() => setDescription(1)} className={`${styles.product_page_description_nav_button} ${description === 1 ? styles.Active : ""}`}>Описание</button>
                    <button onClick={() => setDescription(2)} className={`${styles.product_page_description_nav_button} ${description === 2 ? styles.Active : ""}`}>Документация</button>
                    <button onClick={() => setDescription(3)} className={`${styles.product_page_description_nav_button} ${description === 3 ? styles.Active : ""}`}>Сертификаты и декларации</button>
                </div>
                {description === 1 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Описание</h1>
                        <p>Преобразователь измерительный линейного перемещения серии LPS с блоком BDT предназначен для измерения линейного перемещения промышленных объектов. Состоит из трансформаторного преобразователя LVDT и блока усилительнопреобразующего BDT-07. Изделие имеет линейную выходную характеристику.</p>
                        <p>LVDT (линейный переменный дифференциальный трансформатор) представляет вид индуктивных преобразователей, предназначенных для применения в жестких, промышленных условиях, при высокой температуре и/или давлении, при больших ускорениях и большом числе циклов перемещений.</p>
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

                        <p>Первичный преобразователь линейных перемещений конструктивно представляет линейный переменный дифференциальный трансформатор. Конструкция состоит из трех соосных обмоток и подвижного сердечника на оси трансформатора. Сердечник короче, чем трансформатор, поэтому при его осевом перемещении меняется коэффициент магнитной связи обмоток. На центральную обмотку подается напряжение возбуждения, с боковых обмоток снимается наведенный сигнал, пропорциональный положению сердечника.</p>
                        <img style={{maxWidth: "676px"}} src="/assets/images/LPS/Structure_LPS.png" alt=""/>

                        <h2>Технические характеристики преобразователей</h2>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <th colspan="10">LVDT ПРЕОБРАЗОВАТЕЛЬ</th>
                                </tr>
                                <tr>
                                    <td>Диапазон измерений (мм)</td>
                                    <td colspan="6" style={{display: "flex", flexDirection: "column"}}>
                                        <p>0…25</p>
                                        <p>0…80</p>
                                        <p>0…110</p>
                                        <p>0…150</p>
                                        <p>0…220</p>
                                        <p>0…330</p>
                                        <p>0…440</p>
                                        <p>0…550</p>
                                        <p>0…660</p>
                                    </td>
                                    <td colspan="6">длинна корпуса L (мм)</td>
                                    <td colspan="6" style={{display: "flex", flexDirection: "column"}}>
                                        <p>98</p>
                                        <p>208</p>
                                        <p>268</p>
                                        <p>348</p>
                                        <p>488</p>
                                        <p>708</p>
                                        <p>928</p>
                                        <p>1148</p>
                                        <p>1368</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Исполнение</td>
                                    <td colspan="8">Свободный шток, направленный шток, шарнирные наконечники</td>
                                </tr>
                                 <tr>
                                    <td>Степень защиты </td>
                                    <td colspan="8">IP67</td>
                                </tr>
                                 <tr>
                                    <td>Вибростойкость</td>
                                    <td colspan="8">10g</td>
                                </tr>
                                 <tr>
                                    <td>Ударостойкость</td>
                                    <td colspan="8">200g/ 2мс</td>
                                </tr>
                                 <tr>
                                    <td>Линейность</td>
                                    <td colspan="8">±0,3 % диапазона (±0,1% специальное исполнение под заказ)</td>
                                </tr>
                                <tr>
                                    <td>Номинальное напряжение / частота питания</td>
                                    <td colspan="8">10В, 2,5 кГц</td>
                                </tr>
                                <tr>
                                    <td>Рабочая температура </td>
                                    <td colspan="8">-40…+125 ̊C</td>
                                </tr>
                                <tr>
                                    <td>Материал корпуса</td>
                                    <td colspan="8">Нержавеющая сталь</td>
                                </tr>
                                <tr>
                                    <td>Максимальная длина кабеля</td>
                                    <td colspan="8">100 метров между преобразователем и блоком преобразователя</td>
                                </tr>
                                <tr>
                                    <td>Срок службы</td>
                                    <td colspan="8">до 100 млн. движений</td>
                                </tr>
                                <tr>
                                    <th colspan="10">ШТОК ПРЕОБРАЗОВАТЕЛЯ</th>
                                </tr>
                                <tr>
                                    <td>Исполнение</td>
                                    <td colspan="8">гибкий шток, направленный шток с шарнирным наконечником</td>
                                </tr>
                                <tr>
                                    <td>Срок службы</td>
                                    <td colspan="8">Не ограничен</td>
                                </tr>

                            </tbody>
                        </table>
                        <h2>Код заказа преобразователя</h2>
                        <img style={{maxWidth: "683px"}} src="/assets/images/LPS/struct_code.png" alt=""/>
                        <p>Пример для преобразователя с диапазоном измерения 220мм с направленным штоком и встроенным кабелем 7 метров: LPS-220-DS-CA-07</p>
                        <h3>Есть решения по аналогам LVDT датчиков производства General electric, Kavlico и Solatron Metrology</h3>
                        <p>(GM 5946B, GM 7114C, GM 5686, GM 5686B, GM 5686C, GM 7111D, GM 5777B, GM 5777А, GM 7112D)</p>
                        <img style={{maxWidth: "693px"}} src="/assets/images/LPS/analog_lps.png" alt=""/>
                        <h2>Габаритные и присоединительные размеры</h2>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <th colspan="8">Исполнение со свободным штоком</th>
                                </tr>
                                <tr>
                                    <td colspan="8"><img style={{maxWidth: "660px"}} src="/assets/images/LPS/free_shtok.png" alt=""/></td>
                                </tr>
                                <tr>
                                    <th colspan="8">Исполнение с направленным штоком и шарнирными проушинами</th>
                                </tr>
                                <tr>
                                    <td colspan="8"><img style={{maxWidth: "662px"}} src="/assets/images/LPS/direct_shtok.png" alt=""/></td>
                                </tr>
                                <tr>
                                    <th colspan="8">Размеры</th>
                                </tr>
                                <tr>
                                    <td>Диапазон измерений (мм)</td>
                                    <td>0…110</td>
                                    <td>0…220</td>
                                    <td>0...330</td>
                                    <td>0...440 </td>
                                    <td>0...550</td>
                                    <td>0...660</td>
                                </tr>
                                <tr>
                                    <td>A(мм) </td>
                                    <td>268 </td>
                                    <td>488</td>
                                    <td>708</td>
                                    <td>928</td>
                                    <td>1148</td>
                                    <td>1368</td>
                                </tr>
                                <tr>
                                    <td>B(мм) </td>
                                    <td>130</td>
                                    <td>240</td>
                                    <td>350</td>
                                    <td>460</td>
                                    <td>570</td>
                                    <td>680</td>
                                </tr>
                                <tr>
                                    <td>C(мм)</td>
                                    <td>300</td>
                                    <td>510</td>
                                    <td>740</td>
                                    <td>960</td>
                                    <td>1180</td>
                                    <td>1400</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Исполнение с разъемом</h2>
                        <p>Для исполнения преобразователя с разъемом, кабель с ответным разъемом заказывается отдельно. Возможна поставка кабеля с прямым или угловым разъемом.</p>
                        <table className={styles.table} style={{height: "auto", width: "100%"}}>
                            <tbody>
                                <tr>
                                    <th colspan="2">Угловой</th>
                                </tr>
                                <tr>
                                    <td colspan="1"><img style={{maxWidth: "218px"}} src="/assets/images/LPS/soed_angle.png" alt=""/></td>
                                    <td colspan="1"><img style={{maxWidth: "188px"}} src="/assets/images/LPS/soed_angle_real.png" alt=""/></td>
                                </tr>
                                <tr>
                                    <th colspan="2">Прямой</th>
                                </tr>
                                <tr>
                                    <td colspan="1"><img style={{maxWidth: "259px"}} src="/assets/images/LPS/soed_direct.png" alt=""/></td>
                                    <td colspan="1"><img style={{maxWidth: "189px"}} src="/assets/images/LPS/soed_direct_real.png" alt=""/></td>
                                </tr>
                                <tr>
                                    <td>Максимальный рабочий ток</td>
                                    <td>4 А</td>
                                </tr>
                                <tr>
                                    <td>Рабочее напряжение питания</td>
                                    <td>&lt; 250В DC/AC</td>
                                </tr>
                                <tr>
                                    <td>Диапазон рабочих температур </td>
                                    <td>-25 <sup>о</sup>С ... +90 <sup>о</sup>С</td>
                                </tr>
                                <tr>
                                    <td>Сопротивление контакта</td>
                                    <td>&lt; 0.005 Ом</td>
                                </tr>
                                <tr>
                                    <td>Сопротивление изоляции</td>
                                    <td>&gt; 5*10<sup>8</sup> Ом</td>
                                </tr>
                                <tr>
                                    <td>Присоединение</td>
                                    <td>D4..6мм/макс. 0,75 мм<sup>2</sup></td>
                                </tr>
                                <tr>
                                    <td>Степень защиты по ГОСТ 14254-96</td>
                                    <td>IP67 (в соединенном виде)</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2>Назначение контактов со стороны преобразователя</h2>
                        <img style={{maxWidth: "308px"}} src="/assets/images/LPS/soed_contacts.png" alt=""/>
                        <p>
                            <li>1,2- первичная обмотка</li>
                            <li>3,4 – вторичная обмотка</li>
                        </p>
                        <h2>Настройка и подключение блока преобразования (BDT-07)</h2>
                        <p>Настройка и подключение блока преобразования (BDT-07) представлена по <a style={{color: "var(--main-color)"}} href="/catalog/current_prod_bdt#full_descript">ссылке</a></p>
                    </div>
                }
                {description === 2 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Документация</h1>
                        <ul>
                            <li><a href="/assets/docs/lps/datasheet_lvdt_v6.pdf" download>Техническая спецификация</a></li>
                            <li><a href="/assets/docs/lps/prga-000401.00-re_v11.pdf" download>Руководство по эксплуатации</a></li>
                            <li><a href="/assets/docs/lps/prga-000401.00-tu_v15.pdf" download>Технические условия</a></li>
                            <li><a href="/assets/docs/lps/modeli_stl_lps.zip" download>Модели_STL</a></li>
                        </ul>
                    </div>
                }
                {description === 3 &&
                    <div className={styles.product_page_description_main}>
                        <h1 className={styles.product_page_description_main_header}>Сертификаты и декларации</h1>
                        <h2 className={styles.product_page_description_main_header}>Федеральное агенство по техническому регулированию и метрологии</h2>
                        <ul>
                            <li><a href="/assets/docs/lps/lps-sertifikat-tipa-si.pdf" download>Сертификат об утверждении типа средств измерений</a></li>
                        </ul>

                        <h2>ЕАЭС, электромагн.совм.020/2011</h2>
                        <ul>
                            <li><a href="/assets/docs/lps/№2-sertifikat-sootvetstviya-eaes-na-pa-lps-do-12.12.27-pravilnyj-no-bez-protokola.pdf" download>Декларация Проммаш</a></li>
                            <li><a href="/assets/docs/lps/№5-protokol-ispytanij-k-sertifikatu-sootvetstviya-eaes-pa-lps-24922ilnvo.pdf" download>Протокол АРТЛИКС</a></li>
                            <li><a href="/assets/docs/lps/№4-deklaracziya-o-sootvetstvii-eaes-pa-t-lps-20.09.28-podpisana.pdf" download>Декларация</a></li>
                            <li><a href="/assets/docs/lps/№7-protokol-ispytanij-eaes-pa-t-lps-alyans-grupp.pdf" download>Протокол НЦСС</a></li>
                        </ul>

                        <ul>
                            <li><a href="/assets/docs/lps/sertifikat-trts-004-na-kabel-insil.pdf" download>Сертификат ТРТС 004 на кабель ИнСил</a></li>
                            <li><a href="/assets/docs/lps/protokol-ispytanij_signed.pdf" download>Протокол испытаний</a></li>
                            <li><a href="/assets/docs/lps/deklaracziya-sootvetstviya-15017196-maket-ds-tr-ts.pdf" download>Декларация о соответствии</a></li>
                        </ul>

                        <ul>
                            <li><a href="/assets/docs/lps/protokol-№128g-24-ooo-gk-promavtomatika-t.pdf" download>ПРОТОКОЛ№ 128г-24 испытаний образца датчика линейного перемещения LVDT LPS-50-FS-C1-01 на воздействие плесневых грибов</a></li>
                        </ul>
                    </div>
                }
                
            </div>
        </div>
    )
})

export default cur_prod;