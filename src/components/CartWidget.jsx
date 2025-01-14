import imgcart from "/public/images/cart.png";


export default function CartWidget() {
    return (
        <div className="d-flex">
            <img width="35px" height="35px" src={imgcart} alt="" />
            <h4 class="bi bi-0-circle">1</h4>
        </div>
    );
}