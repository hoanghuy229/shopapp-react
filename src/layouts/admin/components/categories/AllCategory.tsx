import React, { useEffect, useState } from "react";
import { Category } from "../../../../models/Category";
import { getCategory } from "../../../../api/CategoryApi";

export const AllCategory = () => {
   const [categories,setCategories] = useState<Category[]>([]);

   useEffect(() => {
    getCategory()
    .then((categories) => setCategories(categories))
    .catch((error) => console.log(error))
    },[]);

return (
        <div className="container mt-5 mb-5">
            <button className="btn btn-outline-primary mb-5" style={{marginLeft:"500px"}}>ADD CATEGORY</button>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>category name</th>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td><button className="btn btn-outline-danger" style={{fontSize:"13px"}}>DELETE</button></td>
                                <td><button className="btn btn-outline-warning" style={{fontSize:"13px"}}>UPDATE</button></td>
                                <td><button className="btn btn-outline-success" style={{fontSize:"13px"}}>DETAIL</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}