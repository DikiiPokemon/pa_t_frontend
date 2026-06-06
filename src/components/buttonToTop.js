
import { useEffect, useState } from "react"
import styles from "@/components/top_btn.module.css";
import Link from "next/link";

const ToTop = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const toggleVisible = () => {

        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }

        };

        window.addEventListener("scroll", toggleVisible);

        return () => {
        window.removeEventListener("scroll", toggleVisible);
        };

    }, []);

    const scrollToTop = () => {

        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });

    };

  return (
    <button
      title="Кнопка перемещения наверх"
      onClick={scrollToTop}
      className={`${styles.toTop} ${visible ? styles.show : ""}`}
    >
      ↑
    </button>
  );
}

export default ToTop