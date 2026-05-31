import styles from "@/components/CheckButton.module.css";
import Link from "next/link";



const CheckButton = ({ name, controller, setter}) => {


    return(
        <div className={styles.CheckButtonWrapper}>
            <label>
                <input onChange={e => controller(e.target.checked)} checked={setter} className={styles.realCheckBox} name={name} type="checkbox"/>
                <span className={styles.visibleCheckBox}></span>
                <p className={styles.CheckButton_p}>Нажимая кнопку «Отправить»/«Заказать», я даю согласие на обработку персональных данных и принимаю <span><Link href="/info_politics">Политику обработки персональных данных.</Link></span></p>
            </label>
        </div>
    )
}

export default CheckButton