"use client";
import styles from "@/components/Range.module.css";
import { useStore } from "@react-three/fiber";
import { useEffect, useMemo, useState} from "react";
import { createPortal } from "react-dom";




const CartModal = (props) => {

    if (!props.mounted) return null

    const portalRoot = document.getElementById('cart')
    portalRoot ? portalRoot.classList.add("Open") : portalRoot.classList.remove("Open")
    return portalRoot ? createPortal(props.children, portalRoot) : null
        
}

export default CartModal