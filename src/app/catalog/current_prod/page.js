"use client";
import styles from "@/app/catalog/current_prod/page.module.css";
import ProductCard from "@/components/product_card";
import { Suspense, useContext, useEffect, useState } from "react"
import { Context } from "../../layout"
import { fetchProducts } from "@/http/product_controll"
import { observer } from "mobx-react-lite";
import LPS_calc from "@/components/LPS_calc";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";

const cur_prod = observer(() => {

    function Model({ url }) {
        const { scene } = useGLTF(url);
        return <primitive  position={[0, 0, 0]} object={scene} />;
    }

    return(
        <div className={styles.product_page_wrapper}>
            <div className={styles.product_page_charachteristic_wrapper}>
                <div className={styles.product_page_charachteristic_img}>
                    <Canvas shadows style={{width: "100%", height: "100%"}} camera={{ position: [0, 1, 1], fov: 15}}>
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
                        <Suspense fallback={null}>
                            <Model url="/assets/3d/10.gltf" />
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
        </div>
    )
})

export default cur_prod;