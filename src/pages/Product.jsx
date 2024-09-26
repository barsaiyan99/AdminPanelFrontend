import React, { useState, useEffect } from "react";
import http from "../libs/http";
import { UserRoundPen, Trash2, Eye } from "lucide-react";
import formatDate from "../utils/formatDate";
import Popup from "../components/invoiceComponents/InvoicePopup";
import Modal from "../components/Modals/CreateProductModal"; 
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import ProductDetail from "./ProductDetail";

const backendURL = "http://localhost:3000";

const Product = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(`${backendURL}/product/productlist`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [showModal]);

    const handleCheckboxChange = (id) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: !prevCheckedItems[id],
        }));
    };

    const handleDelete = async () => {
        if (!itemToDelete || !checkedItems[itemToDelete]) {
            setDeleteError("Please select the checkbox before deleting.");
            return;
        }

        try {
            await http.delete(`${backendURL}/product/delete/${itemToDelete}`);
            setData(data.filter(item => item._id !== itemToDelete));
            setShowPopup(false);
            setDeleteError(""); 
        } catch (error) {
            console.error("Error deleting item:", error);
            setDeleteError("Error deleting the item. Please try again.");
        }
    };

    const handleEdit = (id) => {
        setModalContent(<EditProduct id={id} setShowModal={setShowModal}/>);
        setShowModal(true);
    };
    const handleDetails = (id) => {
        setModalContent(<ProductDetail id={id} />);
        setShowModal(true);
    };

    const handleCreateButton = () => {
        setModalContent(<CreateProduct  setShowModal={setShowModal}/>);
        setShowModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md">
            {deleteError && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {deleteError}
                </div>
            )}
            <div className="text-end">
                <button
                    onClick={handleCreateButton}
                    className="px-4 py-2 bg-gray-100 text-black text-lg rounded-lg font-semibold m-4"
                >
                    Create Product
                </button>
            </div>
            <table className="w-full text-sm text-left text-black">
                <thead className="text-md uppercase bg-gray">
                    <tr>
                        <th className="px-6 py-3">PRODUCT NAME</th>
                        <th className="px-6 py-3">DESCRIPTION</th>
                        <th className="px-6 py-3">CREATED</th>
                        <th className="px-6 py-3">UPDATED</th>
                        <th className="px-6 py-3">DISCOUNT</th>
                        <th className="px-6 py-3">PRICE</th>
                        <th className="px-6 py-3">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="odd:bg-white even:bg-gray-200">
                            <td className="px-6 py-4 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={!!checkedItems[item._id]}
                                    onChange={() => handleCheckboxChange(item._id)}
                                    className="form-checkbox h-6 w-6 text-purple-600 bg-purple-100 border-purple-300"
                                />
                                <div>
                                    <h1>{item.name}</h1>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p>{item.description}</p>
                            </td>
                            <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                            <td className="px-6 py-4">{formatDate(item.updatedAt)}</td>
                            <td className="px-10 py-4">${item.discount}</td>
                            <td className="px-6 py-4">${item.price}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button className="font-medium hover:underline" onClick={() => handleEdit(item._id)}>
                                    <UserRoundPen />
                                </button>
                                <button className="font-medium hover:underline" onClick={() => handleDetails(item._id)}>
                                    <Eye />
                                </button>
                                <button
                                    onClick={() => {
                                        if (checkedItems[item._id]) {
                                            setItemToDelete(item._id);
                                            setShowPopup(true);
                                            setDeleteError("");
                                        } else {
                                            setDeleteError("Please select the checkbox before deleting.");
                                        }
                                    }}
                                    className="font-medium hover:underline"
                                >
                                    <Trash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Popup
                isOpen={showPopup}
                onConfirm={handleDelete}
                onCancel={() => setShowPopup(false)}
                message="Are you sure you want to delete this product?"
            />
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default Product;
