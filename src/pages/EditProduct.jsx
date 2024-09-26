import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import http from "../libs/http";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";// Import Spinner component

const backendURL = "http://localhost:3000";

const EditProduct = ({ id, setShowModal }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State to manage loading
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(`${backendURL}/product/edit/${id}`);
                reset(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("discount", data.discount);
        formData.append("stock", data.stock);
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

        try {
            await http.put(`${backendURL}/product/edit/${id}`, formData);
            reset();
            setShowModal(false);
            navigate("/dashboard/product");
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Spinner />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description:</label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price:</label>
                            <input
                                type="number"
                                {...register("price", { required: "Price is required", min: 0.01 })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image File:</label>
                            <input
                                type="file"
                                {...register("image")}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Discount:</label>
                            <input
                                type="number"
                                {...register("discount", { min: 0 })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.discount && <p className="text-red-600 text-sm mt-1">{errors.discount.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock:</label>
                            <input
                                type="number"
                                {...register("stock", { required: "Stock is required", min: 0 })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditProduct;
