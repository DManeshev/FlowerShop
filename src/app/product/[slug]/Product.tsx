import { memo } from "react";

import { IProduct } from "@/types/product.interface";

const Product = memo(function Product(props: IProduct) {

    return (
        <div>{props.name}</div>
    )
})

export default Product
