import { useEffect, useState } from "react";
import { getOrderById, updateOrderById } from "../../../../api/AdminApi";
import { OrderResponse } from "../../../../responses/OrderResponse";
import { format } from "date-fns"; // Import format function from date-fns
import { getProductByIds } from "../../../../api/ProductApi";
import { Product } from "../../../../models/Product";

interface OrderDetail{
    order:number;
}
export const OrderDetail:React.FC<OrderDetail> = (props) => {
    const OrderId:number = props.order;
    const [orderDetail,setOrderDetail] = useState<OrderResponse>();
    const [products,setProducts] = useState<Product[]>([]);
    const [status,setStatus] = useState("");
    const [active,setActive] = useState(false);

    const Active:string = orderDetail?.active?"True":"False";

    useEffect(()=>{
        debugger
        getOrderById(OrderId)
        .then(orderResponse =>{
            setOrderDetail(orderResponse);

            if(orderResponse.order_details){
                const productIds: number[] = [];

                orderResponse.order_details.forEach((orderDetail) => {
                    productIds.push(orderDetail.product_id);
                });

                getProductByIds(productIds)
                    .then((productsData) => {
                        setProducts(productsData);
                        productsData.forEach((product) =>{
                            product.thumbnail = `http://localhost:8080/api/v1/products/images/${product.thumbnail}`;
                        })
                })
                .catch((error) => console.log(error));
            }

            })
        .catch(error => console.log(error));
    },[])

   
    const handleSave = async () => {
        debugger
        if(orderDetail){
            const orderDTO:OrderResponse = {
                id:OrderId,
                address: orderDetail.address,
                note: orderDetail.note,
                status: status,
                user_id: orderDetail.user_id,
                fullname: orderDetail.fullname,
                phone_number: orderDetail.phone_number,
                order_date: orderDetail.order_date,
                total_price: orderDetail.total_price,
                shipping_method: orderDetail.shipping_method,
                shipping_address: orderDetail.shipping_address,
                shipping_date: orderDetail.shipping_date,
                tracking_number: orderDetail.tracking_number,
                payment_method: orderDetail.payment_method,
                active:active,
                order_details:orderDetail.order_details
            };
            const response = await updateOrderById(OrderId,orderDTO);

            if(response.includes("update success")){
                alert("success");
            }
        }
    }

    const handleChangeActive = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const active:string = event.target.value;

        if(active === "true"){
            setActive(true);
        }
        else{
            setActive(false);
        }
      };
      const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value)
      };


    return (
        <div className="container">
            <h1 style={{textAlign:"center",marginTop:"20px"}}>Order Detail</h1>

            <div className="row">
                <div className="col-md-6">
                <h3>Order Information</h3>
                <p><strong>Order ID:</strong> { orderDetail?.id }</p>
                <p><strong>User ID:</strong> { orderDetail?.user_id }</p>
                <p><strong>Full Name:</strong> { orderDetail?.fullname }</p>
                <p><strong>Phone Number:</strong> { orderDetail?.phone_number }</p>
                <p><strong>Address:</strong> { orderDetail?.address }</p>
                <p><strong>Note:</strong> { orderDetail?.note }</p>
                <div className="row">
                    <div className="col-1" >
                        <p className="col"><strong>Active:</strong></p>
                    </div>
                    <div className="col-3" style={{marginLeft:"15px"}}>
                            <select className="form-control" id="ActiveSelect" onChange={handleChangeActive}>
                                <option value={Active}>{Active}</option>
                                <option value="true" hidden={Active === "True"}>True</option>
                                <option value="false" hidden={Active === "False"}>False</option>
                            </select>
                    </div>
                </div>
                <p className="mt-3"><strong>Order Date:</strong> { orderDetail && orderDetail.order_date && format(orderDetail.order_date, 'yyyy-MM-dd') }</p>
                            
                <div className="form-group">
                    <label htmlFor="statusSelect"><strong>Status:</strong></label>
                    <select className="form-control" id="statusSelect" onChange={handleChangeStatus}>
                        <option value={orderDetail?.status}>{orderDetail?.status}</option>
                        <option value="pending" hidden={orderDetail?.status === "pending"}>Pending</option>
                        <option value="processing" hidden={orderDetail?.status === "processing"}>Processing</option>
                        <option value="shipped" hidden={orderDetail?.status === "shipped"}>Shipped</option>
                        <option value="delivered" hidden={orderDetail?.status === "delivered"}>Delivered</option>
                        <option value="cancelled" hidden={orderDetail?.status === "cancelled"}>Cancelled</option>
                    </select>
                </div>      
            </div>  
                    
            <table className="table">
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Thumbnail</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                    orderDetail && orderDetail.order_details?.map(order_Detail =>{
                        const product = products.find((p) => p.id === order_Detail.product_id);

                        return (
                            <tr key={order_Detail.id}> 
                                <td><p>{order_Detail.product_id}</p></td>
                                <td><img
                                        src={product?.thumbnail}
                                        className="card-img-top"
                                        alt="Product Thumbnail"
                                        style={{width:"150px",height:"150px"}}/></td>
                                <td>{order_Detail.price}$</td>
                                <td><p>{order_Detail.number_of_products}</p></td>
                            </tr>
                        );
                    })
                    }
                </tbody>
            </table>  
            <button className="btn btn-outline-primary col-md-2 mt-3" style={{marginLeft:"500px"}} onClick={handleSave}>Save</button>
        </div>
        </div>
    );
}