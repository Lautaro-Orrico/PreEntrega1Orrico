import "bootstrap/dist/css/bootstrap.min.css";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import Nav from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as bootstrap from "bootstrap";
function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="Fragancias" />}
        />
        <Route
          path="/destacado/:catid"
          element={<ItemListContainer greeting="Compras por categoría" />}
        />
        <Route
          path="/productM/:catid"
          element={<ItemListContainer greeting="Compras por categoría" />}
        />
        <Route
          path="/productF/:catid"
          element={<ItemListContainer greeting="Compras por categoría" />}
        />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>

    </BrowserRouter>  
  );
}

export default App;
