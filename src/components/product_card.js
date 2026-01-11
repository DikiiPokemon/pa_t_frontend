import Link from "next/link"
import styles from "@/components/ProductCard.module.css";

const ProductCard = ({product}) => {



    return(
        <Link href={product.href}>
            <div className={styles.product_card_wrapper}>
                <div className={styles.product_card_container}>
                    <div className={styles.product_card_img}></div>
                    <div className={styles.product_card_name}>{product.name}</div>
                    <div className={styles.product_card_description}>{product.description}</div>
                </div>
            </div>
        </Link>
        
    )
}

export default ProductCard