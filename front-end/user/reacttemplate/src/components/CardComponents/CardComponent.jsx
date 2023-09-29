
import formatPrice from "../../utils/util_price"
import capitalize from "../../utils/util_capitalize_first"
import { useNavigate } from "react-router-dom"
import { WrapperLableText, WrapperAvatar, capitalizeFirst } from "./style"

const CardComponent = (props) => {
    const {name, avatar, price, id} = props
    let history = useNavigate();

    const handleViewDetail = (id) => {
        history(`/variant-service-detail/${id}`)
    }

    // key={variantService.id}
    // name={variantService.name}
    // avatar={variantService.avatar}
    // price={variantService.price}
    return (
        <div className="col-sm-5-item">
        <div className="col-services-item">
            <div className="col-services-item-img">
                <WrapperAvatar>
                <a onClick={() => handleViewDetail(id)}>
                        <img src={avatar} alt="wedding-dress-1" className=""/>
                </a>
                </WrapperAvatar>
            </div>
            <WrapperLableText>
                <a onClick={() => handleViewDetail(id)}>{capitalize(name)}</a>
            </WrapperLableText>
            <span className="col-services-item_price">{formatPrice(price)}đ</span>
        </div>
        </div>
    )
}
export default CardComponent