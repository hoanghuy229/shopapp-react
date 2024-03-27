import React, { useEffect, useState } from "react";
import { Category } from "../../../../models/Category";
import { getCategory } from "../../../../api/CategoryApi";
import { AddNewCategory, DeleteCategory, UpdateCategory } from "../../../../api/AdminApi";

export const AllCategory = () => {
   const [categories,setCategories] = useState<Category[]>([]);

   useEffect(() => {
    getCategory()
    .then((categories) => setCategories(categories))
    .catch((error) => console.log(error))
    },[]);

    const handleAdd = async () => {
        const newCategoryName = window.prompt("Enter the name of category:");
        if (newCategoryName) {
           try {
               const addedCategory = await AddNewCategory(newCategoryName); 
               
               if(addedCategory.includes("create category successfully!!!")){
                alert("add success !!!");
               window.location.reload(); // Reload trang khi thêm thành công
               }
           } catch (error) {
               console.log(error);
           }
        }
    }

    const handleUpdate = async (id:number) => {
        const newCategoryName = window.prompt(`Update category id = ${id} :`);
        if (newCategoryName) {
           try {
               const addedCategory = await UpdateCategory(id,newCategoryName); 
               
               if(addedCategory.includes("success")){
                alert("update success !!!");
               window.location.reload(); // Reload trang khi thêm thành công
               }
           } catch (error) {
               console.log(error);
           }
        }
    }

    const handleDelete = async (id:number) => {
        
        if (window.confirm("are you sure ? ")) {
           DeleteCategory(id)
           .then(() => {
            // Remove the deleted category from the state
            setCategories(categories.filter(category => category.id !== id));
            })
            .catch(error => alert("this category have products"));
        }
    }

return (
        <div className="container mt-5 mb-5">
            <button className="btn btn-outline-primary mb-5" style={{marginLeft:"500px"}} onClick={handleAdd}>ADD CATEGORY</button>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>category name</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td><button className="btn btn-outline-danger" style={{fontSize:"13px"}} onClick={(e)=>handleDelete(category.id)}>DELETE</button></td>
                                <td><button className="btn btn-outline-success" style={{fontSize:"13px"}} onClick={(e) =>handleUpdate(category.id)}>UPDATE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}