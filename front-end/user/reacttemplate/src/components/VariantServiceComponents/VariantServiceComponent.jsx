import formatPrice from "../../utils/util_price"
import capitalize from "../../utils/util_capitalize_first"
const VariantServiceComponent = (props) => {
    const {name, description, avatar, price} = props
    // key={variantService.id}
    // name={variantService.name}
    // avatar={variantService.avatar}
    // price={variantService.price}
    return (
        <div className="row row_colection">
            <div className="col-sm-6 col-sm-6_left">
                <div className="image-collection_main">
                    <img src={avatar} alt={name} className="variant-service-detail-image"/>
                </div>

                <div className="image-collection_container">
                    <img src={avatar} alt={name} className="variant-service-detail-image"/>
                </div>
            </div>
            <div className="col-sm-6 col-sm-6_right">
                <div className="content-collection_item">
                    <h1 className="variant-service-item_name">{capitalize(name)}</h1>
                    <p>{description}</p>
                    <div className="content-collection_item-price">
                        <span className="price-text">Giá thuê:</span>
                        <span className="price-number">{formatPrice(price)}đ</span>
                    </div>
                    <div className="btn-add-cart">
                        <a href="cart.html" className="btn-add-cart">Thêm vào giỏ hàng</a>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default VariantServiceComponent