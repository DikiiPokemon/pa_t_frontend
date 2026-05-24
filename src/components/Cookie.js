"use client"
import styles from "@/components/Cookie.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Arrow from "@/components/assets/Arrow_down.svg"
import Link from "next/link";
import { productsStore } from "@/store/product_store";

const Cookie = (props) => {
    function accept () {
        localStorage.setItem("cookie", false)
        productsStore.setCookie(false)
    }

    return(
        <div className={styles.cookie_wrapper}>
            <p>Мы используем куки. Это нужно, чтобы сайт работал лучше. Оставаясь с нами, вы соглашаетесь на использование <Link href="/privacy_policy">файлов куки и политики конфеденциальности.</Link></p>
            <button onClick={() => accept()} className={styles.product_card_to_prod}>Принять</button>
        </div>
    )
}

export default Cookie