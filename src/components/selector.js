import styles from "@/components/Selector.module.css";
import { useEffect, useRef, useState } from "react";
const Selector = ({arr}) => {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState(arr[0])

    const callMenu = useRef(null)

    useEffect(() => {
        const onClick = e => callMenu.current.contains(e.target) || setActive(false)
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return(
        <button ref={callMenu} onClick={() => setActive(!active)} className={styles.selector_wrapper}>
            <div className={styles.active_element}>{value}</div>
            <div className={`${styles.menu_wrapper} ${active ? styles.Active : ""}`}>
                {
                    arr?.map((i,idx) => {
                        if(i !== value){
                            return(
                                <button onClick={() => setValue(i)} key={i + idx} className={styles.selector_element}>{i}</button>
                            )
                        }
                    })
                }
            </div>
            
        </button>
    )
}

export default Selector