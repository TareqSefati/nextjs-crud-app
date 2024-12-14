"use client"

import React, { useEffect, useState } from 'react'

export default function ProductTable() {
    const [products, setProducts] = useState([]);

    const getAndSetProduct = () => {
        fetch("https://crud.teamrabbil.com/api/v1/ReadProduct")
            .then((res) => res.json())
            .then((data) => {
                console.log("Categories Data: ", data.data);
                setProducts(data.data);
            })
            .catch((error) => console.log("Error: ", error));
    }
    useEffect(() => {
        getAndSetProduct();
    }, []);

    const deleteProduct = (productId) => {
        console.log("Deleting product having id: ", productId);
        fetch(`https://crud.teamrabbil.com/api/v1/DeleteProduct/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Procunt deleted success:  ", data);
                getAndSetProduct();
            })
            .catch((error) => console.log("Error: ", error));
    }
    
    return (
        <div>
            <div className="overflow-x-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={product.Img || null}
                                                            alt={product.ProductName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.ProductName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{product.UnitPrice}</p>
                                        </td>
                                        <td>
                                            <p>{product.Qty}</p>
                                        </td>
                                        <td>
                                            <p>{product.TotalPrice}</p>
                                        </td>
                                        <th>
                                            <button className="btn btn-outline btn-xs btn-info mr-2">Edit</button>
                                            <button
                                                className="btn btn-outline btn-xs btn-error"
                                                onClick={() => deleteProduct(product._id)}>
                                                Delete
                                            </button>
                                        </th>
                                    </tr>
                                );
                            })
                        }
                        {/* row 1 */}


                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </div>
    )
}
