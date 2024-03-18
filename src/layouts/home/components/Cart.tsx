import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getProductByIds } from "../../../api/ProductApi";
import { Product } from "../../../models/Product";
import CartService from "../../../services/CookieService";
import { useNavigate } from "react-router-dom";
import { getUserId,isTokenExpired } from "../../../services/TokenService";

export const Cart = () => {

    const [cookies] = useCookies(['cart']);
    let [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{[key: number]: number}>({}); //key value

    const navigate = useNavigate();
    const cartService = CartService();

    useEffect(() => {
        // Lấy danh sách ID sản phẩm từ cookie 'cart'
        const productIds: number[] = Object.keys(cookies.cart || {}).map(Number);

         // Kiểm tra nếu không có sản phẩm trong giỏ hàng thì không cần gọi API
        if (productIds.length === 0) return;
        
        // Gọi hàm để lấy thông tin sản phẩm từ backend
        getProductByIds(productIds)
        .then(
            (products)=>{
                setProducts(products);

                products.forEach((product)=>{
                    product.thumbnail = `http://localhost:8080/api/v1/products/images/${product.thumbnail}`;
                })

                // Lấy số lượng của từng sản phẩm dựa vào ID
                const newQuantities: {[key: number]: number} = {};
                productIds.forEach(id => {
                    newQuantities[id] = cookies.cart[id];
                });
                setQuantities(newQuantities);
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }, [cookies.cart]);
   
    const getTotalPrice = () => {
        let totalPrice = 0;
        products.forEach((product) => {
            totalPrice += (product.price && product.price *  quantities[product.id]) || 0;
        });
        return totalPrice;
    };

    const removeItem = (id:number) => {
        cartService.removeFromCart(id);
        if(products.length === 1){
            setProducts([]);
        }
        products= products.filter((product) => product.id !== id);
        getTotalPrice();
        
    }

    const increaseQuantity = (productid:number) => {
        const updateQuantity = quantities[productid] + 1;
        const updateQuantites = {...quantities,[productid]:updateQuantity}; // [productid] là key và updateQuantity là value
        setQuantities(updateQuantites);
        cartService.updateQuantity(productid, updateQuantity);
    }

    const decreaseQuantity = (productid:number) => {

        if (quantities[productid] === 1) return;

        const updateQuantity = quantities[productid] - 1;
        const updateQuantites = { ...quantities, [productid]: updateQuantity };
        setQuantities(updateQuantites);
        cartService.updateQuantity(productid, updateQuantity);
    
    }

    const moveToOrderConfirm = () => {
        if(products.length === 0) {
            alert("no product !!!");
            return
        };

        debugger
        const token = localStorage.getItem("token");

        if(token == null){
            alert("need login !!!");
            navigate("/login");
        }
        else {
            const userId = getUserId(token);
        
            if(!isTokenExpired(token) && userId){
                navigate("/orderConfirm");
            }
        }
        
        
        //navigate("/orderConfirm");
    }
    
    return (
        <div className="container">
            <div className="confirmation-container" style={confirmationContainerStyle}>
                <h1 style={{textAlign:"center"}}>Xác nhận đơn hàng</h1>
            </div>
            <div className="row">
            <div className="mt-3"></div>

            <table>
    <thead >
        <tr>
            <th className="text-start">Sản phẩm</th>
            <th scope="col" >Số lượng</th>
            <th scope="col" >Đơn giá</th>
            <th scope="col" >Tổng giá</th>
        </tr>
    </thead>
    <tbody>
        {
            products && products.map((product) => (
                <tr key={product.id}>
                    <td>
                        <div className="product-info col-md-9 d-flex">
                            <img src={product.thumbnail} className="product-image" style={{width:'100px',height:'100px',marginTop:"10px"}}/>
                            <span className="product-name" style={{marginLeft:"20px",marginTop:"40px",fontWeight:"bold"}}>{product.name}</span>
                        </div>
                    </td>
                    <td>
                        <div className="d-flex" style={{marginRight:"10px"}}>
                            <button className="btn btn-link px-1"onClick={() => decreaseQuantity(product.id)}><i className="fas fa-minus"></i></button>
                            <input id="form1" min="0" name="quantity"  value={quantities[product.id]} type="text" className="form-control form-control-sm text-center" style={{ width: '80px' }} readOnly />
                            <button className="btn btn-link px-1" onClick={() => increaseQuantity(product.id)}><i className="fas fa-plus"></i></button>
                        </div>
                    </td>
                    <td>{(product.price && product.price.toFixed(1))} $</td>
                    <td>{(product.price && (product.price * quantities[product.id]).toFixed(1)) || 0} $</td>
                    <td>
                        <button className="btn btn-danger" onClick={(e) => removeItem(product.id)}>Xóa</button>
                    </td>
                </tr>
            ))
        }
    </tbody>
</table>

            </div>

            <div className="input-group mb-3 mt-3 col-6">
                <input type="text" className="form-control" placeholder="Mã giảm giá" />
                <div className="input-group-append" style={{ marginLeft: '10px' }}>
                    <button className="btn btn-outline-secondary" type="button">Áp dụng mã</button>
                </div>
            </div>

            <p className="mb-0">Tổng tiền: <span>{getTotalPrice().toFixed(1)} $</span></p>
            <div className="text-center mt-3">
                <button className="btn btn-outline-primary" type="button" onClick={moveToOrderConfirm}>Đặt hàng</button>
            </div>
        </div>
    );
}

const confirmationContainerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    marginBottom: '30px',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};


