import styles from "@/components/Range.module.css";
import { useEffect, useState } from "react";

const RangePicker = (props) => {
    const [value, setValue] = useState(props.getter)

    useEffect(() => {
        props.setter(value)
    }, [value])

    return(
        <div className={styles.range_picker_wrapper}>
            <input className={styles.range} onChange={(e) => setValue(e.target.value)} type="range" value={value} min={0} max={40}/>
            <div className={styles.range_picker_value}>{value}</div>
        </div>
    )
}

export default RangePicker