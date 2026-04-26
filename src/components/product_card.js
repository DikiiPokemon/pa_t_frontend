import Link from "next/link"
import styles from "@/components/ProductCard.module.css";
import Image from "next/image";

const ProductCard = ({product}) => {



    return(
            <Link href={product.href} className={styles.product_short_card_wrapper}>
                <div className={styles.product_short_card_container}>
                    <div className={styles.product_card_img}>
                        <Image width={"300"} height={"300"}  src={product.img}/>
                    </div>
                    <div className={styles.product_short_card_info}> 
                        <h2 className={styles.product_card_name}>{product.name}</h2>
                        <div className={styles.product_short_card_description}>{product.short_description}</div>
                    </div>
                </div>
            </Link>
    )
}

export default ProductCard