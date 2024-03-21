import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdersOfUser } from "../../../api/OrderApi";
import { OrderResponse } from "../../../responses/OrderResponse";
import { getProductByIds } from "../../../api/ProductApi";
import { Product } from "../../../models/Product";

export const OrderHistory = () => {
    const [orderResponses, setOrderResponses] = useState<OrderResponse[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrdersOfUser()
            .then((data) => {
                setOrderResponses(data);
            })
            .catch((error) => console.log(error));
    }, []);


    useEffect(() => {
        const productIds: number[] = [];
        orderResponses.forEach((orderResponse) => {
            if (orderResponse.order_details) {
                orderResponse.order_details.forEach((orderDetail) => {
                    productIds.push(orderDetail.product_id);
                });
            }
        });
        getProductByIds(productIds)
            .then((productsData) => {
                setProducts(productsData);
                productsData.map((product) =>{
                    product.thumbnail = `http://localhost:8080/api/v1/products/images/${product.thumbnail}`;
                })
            })
            .catch((error) => console.log(error));
    }, [orderResponses]);




    if (localStorage.getItem("user") === null) {
        alert("Login to view order history!");
        navigate("/login");
        return <h1>Please log in to view order history!</h1>;
    }
    if(orderResponses === null){
        return (
            <h1>nothing here !!!</h1>
        )
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4" style={{ textAlign: "center" }}>
                Order History
            </h1>
            {orderResponses.map((order) => (
                <div key={order.id} className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title"> <strong>Order ID:</strong> {order.id} </h5>
                        <div className="row mb-5">
                            <div className="col-2"> <p className="card-text"><strong>Status:</strong> {order.status}</p>
                            </div>
                            <div className="col-2">
                                <p className="card-text"><strong>Order Date:</strong>
                                    {" "}{order.order_date? new Date(order.order_date).toLocaleDateString(): "N/A"}
                                </p>
                            </div>
                            <div className="col-2">
                                <p className="card-text"> <strong>Total Price:</strong>{" "}{order.total_price} </p>
                            </div>
                            <div className="col-2">
                                <p className="card-text"> <strong>Payment Method:</strong>{" "}{order.payment_method} </p>
                            </div>
                            <div className="col-2">
                                <p className="card-text"> <strong>Shipping Method:</strong>{" "}{order.shipping_method} </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Order Details:</h5>
                                <div className="row">
                                    {order.order_details?.map( (orderDetail) => {
                                            const product = products.find((p) =>p.id === orderDetail.product_id);
                                            return (
                                                <div key={orderDetail.id} className="col-md-4">
                                                    <div className="card mb-3" style={{maxWidth:"300px",maxHeight:"350px"}}>
                                                        <img
                                                            src={product?.thumbnail}
                                                            className="card-img-top"
                                                            alt="Product Thumbnail"
                                                            style={{width:"auto",height:"250px"}}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">
                                                                {product?.name ||"Unknown Product"}
                                                            </h5>
                                                            <div className="row">
                                                                <p className="card-text col-6">
                                                                    Quantity:{" "}{ orderDetail.number_of_products }
                                                                </p>
                                                                <p className="card-text col-6">
                                                                    Price:{" "}{ orderDetail.price }$
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
