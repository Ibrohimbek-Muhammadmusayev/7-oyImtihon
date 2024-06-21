import { Route, Routes } from "react-router-dom";
import App from '../App';
import Proudcts from "../pages/products";
import Cart from "../pages/cart";
import Login from "../pages/login";
import Register from "../pages/register";

export function Routers(){
    return [
        <>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/products" element={<Proudcts/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<h1>404 page not fount</h1>}/>
            </Routes>
        </>
    ]
}

export default Routers;