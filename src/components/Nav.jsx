import CartWidget from "./CartWidget"
import imgcart from "/public/img/logo.png";



export default function Nav(props) {


    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-relative">
                <a class="navbar-brand ms-3" href="#"><img src={imgcart} width="100px" alt=""/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse position-absolute top-50 start-50 translate-middle" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Destacado</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Fragancias Masculinas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Fragancias Femeninas</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="position-absolute end-0 translate-end me-4">
                <CartWidget />
            </div>
        </nav>
    );
}