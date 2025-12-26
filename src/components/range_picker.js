import styles from "@/components/Range.module.css";
import { useState } from "react";

const RangePicker = () => {
    const [value, setValue] = useState(0)

    return(
        <div className={styles.range_picker_wrapper}>
            <input className={styles.range} onChange={(e) => setValue(e.target.value)} type="range" value={value} min={0} max={40}/>
            <div className={styles.range_picker_value}>{value}</div>
        </div>
    )
}

export default RangePicker