"use client";
import { useStore } from "@react-three/fiber";
import { useEffect, useMemo, useState} from "react";
import { createPortal } from "react-dom";




const Error = (props) => {

    if (!props.mounted) return null

    const portalRoot = document.getElementById('error')
    if(portalRoot && props.show){
        portalRoot.classList.add("Open")
        portalRoot.classList.remove("Close")
    }else{
        portalRoot.classList.remove("Open")
        portalRoot.classList.add("Close")
    }
    return portalRoot && props.show ? createPortal(props.children, portalRoot) : null
        
}

export default Error