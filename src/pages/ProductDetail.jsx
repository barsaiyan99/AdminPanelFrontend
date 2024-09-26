import React, { useState, useEffect } from "react"
import http from "../libs/http"
import Spinner from "../components/Spinner"

const backendURL = "http://localhost:3000"

const ProductDetail = ({ id }) => {
    const [loadedData, setLoadedData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [imageLoading, setImageLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(
                    `${backendURL}/product/edit/${id}`
                )
                setLoadedData(response.data)
                setLoading(false)
            } catch (error) {
                setError("Error fetching data. Please try again.")
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    if (loading) {
        return (
            <div className="p-4 text-center">
                <Spinner />
                <p className="text-gray-500 mt-2">Loading...</p>
            </div>
        )
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>
    }

    if (!loadedData) {
        return (
            <div className="p-4 text-center text-gray-500">
                No product data found.
            </div>
        )
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          {loadedData.image && (
                <div className="relative w-full h-64 mb-4">
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Spinner />
                        </div>
                    )}
                    <img
                        src={loadedData.image.url}
                        alt={loadedData.name}
                        className={`w-full h-full object-cover rounded-lg ${imageLoading ? "hidden" : "block"}`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)} // Handle image load error
                    />
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">{loadedData.name}</h1>
            <p className="text-gray-700 mb-2">{loadedData.description}</p>
            <p className="text-gray-600 mb-2">Price: ${loadedData.price}</p>
            <p className="text-gray-600 mb-2">
                Discount: {loadedData.discount}%
            </p>
            <p className="text-gray-600 mb-4">Stock: {loadedData.stock}</p>
            
        </div>
    )
}

export default ProductDetail
