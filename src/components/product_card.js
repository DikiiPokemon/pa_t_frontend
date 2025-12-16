import Link from "next/link"


const ProductCard = ({product}) => {



    return(
        <Link href="/catalog/current_prod">
            <div className="product_card_wrapper">
                <div className="product_card_container">
                    <div className="product_card_img"></div>
                    <div className="product_card_name">{product.name}</div>
                    <div className="product_card_description">{product.description}</div>
                </div>
            </div>
        </Link>
        
    )
}

export default ProductCard