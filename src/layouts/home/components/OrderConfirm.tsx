import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Product } from "../../../models/Product";
import { getProductByIds } from "../../../api/ProductApi";

export const OrderConfirm = () => {

    const [cookies] = useCookies(['cart']);
    const [products,setProducts] = useState<Product[]>([]);
    const [quantites,setQuantites] = useState<{[key:number]:number}>({}); //key value
    
    const [checkPhoneNumber,setCheckPhoneNumber] = useState("");
    const [checkEmail,setCheckEmail] = useState("");


    const [phoneNumber,setPhoneNumber] = useState("");
    const [email,setEmail] = useState("");
    const [fullname,setFullName] = useState("");
    const [address,setAddress] = useState("");
    const [note,setNote] = useState("");
    const [shippingMethod,setShippingMethod] = useState("");
    const [paymentMethod,setPaymentMethod] = useState("");
    const [totalPrice,setTotalPrice] = useState(0);


    useEffect(() => {
        const productIds:number[] = Object.keys(cookies.cart || {}).map(Number);

        getProductByIds(productIds)
        .then(
            (products) => {
                setProducts(products)

                products.map((product) =>{
                    product.thumbnail = `http://localhost:8080/api/v1/products/images/${product.thumbnail}`;
                })

                const newQuantites:{[key:number]:number} = {};
                productIds.map(id =>{
                    newQuantites[id] = cookies.cart[id];
                });
                setQuantites(newQuantites);
            }
        )
        .catch((error)=> console.log(error))
    }, [cookies.cart]);


    const getTotalPrice = () => {
        let totalPrice = 0;
        products.forEach((product) => {
            totalPrice += (product.price && product.price *  quantites[product.id]) || 0;
        });
        setTotalPrice(totalPrice);
        return totalPrice;
    };

    const validatePhoneNumber = (phoneNumber: string):boolean => {
        const regex = /^[0-9]{10,11}$/; //kiểm tra số điện thoại
        return regex.test(phoneNumber);// true 
    }

    const setPhone = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        setCheckPhoneNumber("");
        if(!validatePhoneNumber(e.target.value)){
            setCheckPhoneNumber("Số điện thoại không hợp lệ");
        }
    }
    const validateUserEmail = (email: string):boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const setUserEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setCheckEmail("");
        if(!validateUserEmail(e.target.value)){
            setCheckEmail("email không hợp lệ");
        }
    }

    const handlePaymentMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setPaymentMethod(value);

    }
    const handleShippingMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setShippingMethod(value);

    }

    const handleSubmit = () => {

    }

    return (
        <div className="container">
    <div className="intro-section">
        <h1 style={{textAlign:"center",margin:"30px"}}>Order Confirm</h1>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="row">
        <div className="col-md-6">
            <h2 className="product-header mb-3" style={{textAlign:"center"}}>Thông tin người nhận</h2>
                <div className="mb-3">
                    <label htmlFor="fullname"  className="form-label">Họ và tên</label>
                    <input type="text" placeholder="họ và tên" value={fullname} onChange={(e) => setFullName(e.target.value)} className="form-control" id="fullname" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" placeholder="địa chỉ email"  value={email} onChange={setUserEmail} className="form-control" id="email"/>
                    {
                        checkEmail && (<p style={{color:'red'}}>{checkEmail}</p>)
                    }
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input type="text" className="form-control" placeholder="Số điện thoại"  value={phoneNumber} onChange={setPhone} required/>
                    {
                        checkPhoneNumber && (<p style={{color:'red'}}>{checkPhoneNumber}</p>)
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Địa chỉ" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Ghi chú</label>
                    <input type="text" className="form-control" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="shippingMethod">Phương thức vận chuyển</label>
                    <select className="form-control" id="shippingMethod" onChange={handleShippingMethod}>
                        <option value="express">Nhanh (Express)</option>
                        <option value="normal">Thường (Normal)</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                    <select className="form-control" id="paymentMethod" onChange={handlePaymentMethod}>
                        <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                        <option value="other">Thanh toán khác</option>
                    </select>
                </div>
        </div>
        <div className="col-md-6">
            <h2 className="product-order mb-3" style={{textAlign:"center"}}>Sản phẩm đã đặt hàng</h2>
            <table style={{width:"100%",borderRadius:"10px",border:"1px solid white",borderCollapse:"separate",borderSpacing:"0"}}>
            <thead >
                <tr>
                    <th style={{textAlign:"center"}} scope="col" >Sản phẩm</th>
                    <th style={{textAlign:"center"}} scope="col">Số lượng</th>
                    <th style={{textAlign:"center"}} scope="col">Đơn giá</th>
                    <th style={{textAlign:"center"}} scope="col">Tổng giá</th>
                </tr>
            </thead>
            <tbody >
                {
                    products && products.map((product) =>(
                        <tr >
                            <td style={{textAlign:"center"}}>
                                <div className="product-info">
                                    <img src={product.thumbnail} className="product-image" style={{maxWidth:"150px",maxHeight:"150px",borderRadius:"5px"}}/>
                                    <span className="product-name"></span>
                                </div>
                            </td>
                            <td style={{textAlign:"center",fontWeight:"bold"}}>{quantites[product.id]}</td>
                            <td style={{textAlign:"center",fontWeight:"bold"}}>{product.price}$</td>
                            <td style={{textAlign:"center",fontWeight:"bold"}}>{product.price && product.price * quantites[product.id]}$</td>

                        </tr>
                    ))
                }
                    
            </tbody>
        </table>
            <div className="text-start mt-3">
                <h4 className="header-text text-end ">Tổng giá: <span>{getTotalPrice().toFixed(1)} $</span></h4>
            </div>
            <div className="mt-3">
                <h4 className="product-header">Nhập coupon</h4>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Nhập coupon"/>
                    <button className="btn btn-gradient" type="button">Áp dụng</button>
                </div>
            </div>
            <div className=" mt-5 d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-outline-success" type="submit" style={{width:"200px",height:"70px",fontSize:"30px"}}>Đặt hàng</button>
            </div>
        </div>
    </div>
</form>
</div>
    );
}