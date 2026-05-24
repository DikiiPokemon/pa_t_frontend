import styles from "@/components/CheckButton.module.css";



const CheckButton = ({label, name, controller, setter}) => {


    return(
        <div className={styles.CheckButtonWrapper}>
            <label>
                <input onChange={e => controller(e.target.checked)} checked={setter} className={styles.realCheckBox} name={name} type="checkbox"/>
                <span className={styles.visibleCheckBox}></span>
                <p>{label}</p>
            </label>
        </div>
    )
}

export default CheckButton