import { useEffect, useState } from "react";
import { Product } from "../../models/Product";

interface ProductProp{
    product:Product
}


export const ProductProp: React.FC<ProductProp> = (props) => {
    return (
        <div className="col-md-3 mt-2">
            <div className="card" style={{ minHeight: '500px', objectFit: 'cover' }}>
                <img
                    src={props.product.url}
                    className="card-img-top"
                    alt="product img"
                    style={{ height: '300px' }}
                />
                <div className="card-body" style={{height:"200px"}}>
                    <h5 className="card-title" style={{ fontWeight: '600' }}>{props.product.name}</h5>
                    <div className="row">
                        <p className="card-text mb-3" style={{ height: '50px', overflow: 'hidden' }}>{props.product.des}</p>
                    </div>
                    <div className="price row">
                        <span className="original-price col-6">
                            <del>{props.product.price}$</del>
                        </span>
                        <span className="discounted-price col-6 text-end">
                            <strong>{props.product.price}$</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <button className="btn btn-secondary btn-block me-2" style={{marginRight:"100%"}}>
                                <i className="fas fa-heart"></i>
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block" style={{marginLeft:"70%"}}>
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
