import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import Nav from "./components/Nav";
import CartWidget from "./components/CartWidget";
import ItemListContainer from "./components/ItemListContainer";


function App() {


  return (
    <>
    <section>
      <Nav></Nav>
    </section>
      <section>
        <div>
          <ItemListContainer name="Santiago"/>
        </div>
      </section>
    </>
  );
}

export default App;
