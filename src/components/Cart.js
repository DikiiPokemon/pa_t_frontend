"use client";
import styles from "@/components/Cart.module.css";
import { useStore } from "@react-three/fiber";
import { useEffect, useMemo, useState} from "react";
import { createPortal } from "react-dom";




const CartModal = (props) => {

    if (!props.mounted) return null

    const portalRoot = document.getElementById('cart')
    portalRoot && props.show ? portalRoot.classList.add("Open") : portalRoot.classList.remove("Open")
    return portalRoot && props.show ? createPortal(props.children, portalRoot) : null
        
}

export default CartModal