"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { productId } = useParams();
    const router = useRouter();
    console.log("Product id is: ", productId);
    const [updateProduct, setUpdateProduct] = useState({});
    useEffect(() => {
        fetch(`https://crud.teamrabbil.com/api/v1/ReadProductByID/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Updatable product data: ", data.data[0]);
                setUpdateProduct(data.data[0]);
            })
            .catch((error) => console.log("Error: ", error));
    }, []);

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        console.log("Trying to update product and save into database.");
        const form = new FormData(event.currentTarget);
        const productData = {
            Img: form.get("image"),
            ProductCode: form.get("productCode"),
            ProductName: form.get("name"),
            Qty: form.get("qty"),
            TotalPrice: form.get("totalPrice"),
            UnitPrice: form.get("unitPrice")
        }
        console.log("Product Data", productData);

        fetch(`https://crud.teamrabbil.com/api/v1/UpdateProduct/${productId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productData),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data?.data.modifiedCount === 1) {
                    console.log("Product updated successfully!");
                }
                event.target.reset(); //to clear inpur fields after submit- but it does not work here due to default value.
                router.push('/');
            })
            .catch((err) => {
                console.log("Product update failed. Error", err);
            })
    }


    return (
        <div className="max-w-6xl mx-auto rounded-md shadow-md p-5">
            <h1 className="text-3xl mb-2">Update Product</h1>
            <hr />

            <form onSubmit={handleUpdateProduct} className="mt-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-3 w-1/3">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Product name</span>
                            </div>
                            <input type="text" defaultValue={updateProduct?.ProductName} name="name" placeholder="product name" className="input input-bordered input-sm w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Unit Price</span>
                            </div>
                            <input type="text" defaultValue={updateProduct?.UnitPrice} name="unitPrice" placeholder="Unit Price" className="input input-bordered input-sm w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="space-y-3 w-1/3">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Product Code</span>
                            </div>
                            <input type="text" defaultValue={updateProduct?.ProductCode} name="productCode" placeholder="product name" className="input input-bordered input-sm w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Qty</span>
                            </div>
                            <input type="text" defaultValue={updateProduct?.Qty} name="qty" placeholder="Unit Price" className="input input-bordered input-sm w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="space-y-3 w-1/3">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input type="text" defaultValue={updateProduct?.ProductName} name="Img" placeholder="product name" className="input input-bordered input-sm w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Total Price</span>
                            </div>
                            <input type="text" defaultValue={updateProduct?.TotalPrice} name="totalPrice" placeholder="Unit Price" className="input input-bordered input-sm w-full max-w-xs" />
                        </label>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-outline w-32">Save</button>
                </div>
            </form>
        </div>
    )
}
