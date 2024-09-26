import React, { useState, useEffect } from "react";
import http from "../libs/http";
import { UserRoundPen, Trash2, Eye } from "lucide-react";
import formatDate from "../utils/formatDate";
import Popup from "../components/invoiceComponents/InvoicePopup";

const backendURL = "http://localhost:3000";

const Invoice = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(`${backendURL}/auth/dashboard/list`);
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (id) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [id]: !prevCheckedItems[id],
        }));
    };

    const statusClasses = {
        Delivered: "border-green-900 text-CustomSuccessGreen bg-CustomBgSuccessGreen",
        Cancelled: "border-red-900 text-CustomDangerRed bg-CustomBgDangerRed",
        Pending: "border-yellow-500 text-CustomYellow bg-CustomBgYellow",
    };

    const handleDelete = async () => {
        if (!itemToDelete || !checkedItems[itemToDelete]) {
            setDeleteError("Please select the checkbox before deleting.");
            return;
        }

        try {
            await http.delete(`${backendURL}/auth/dashboard/list/delete/${itemToDelete}`);
            setData(data.filter(item => item._id !== itemToDelete));
            setShowPopup(false);
            setDeleteError(""); 
        } catch (error) {
            console.error("Error deleting item:", error);
            setDeleteError("Error deleting the item. Please try again.");
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md">
            <Popup
                isOpen={showPopup}
                onConfirm={handleDelete}
                onCancel={() => setShowPopup(false)}
                message="Are you sure you want to delete this invoice?"
            />
            {deleteError && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {deleteError}
                </div>
            )}
            <table className="w-full text-sm text-left text-black">
                <thead className="text-md uppercase bg-gray">
                    <tr>
                        <th className="px-6 py-3">CUSTOMER</th>
                        <th className="px-6 py-3">PHONE</th>
                        <th className="px-6 py-3">CREATED</th>
                        <th className="px-6 py-3">DUE DATE</th>
                        <th className="px-6 py-3">AMOUNT</th>
                        <th className="px-6 py-3">STATUS</th>
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
                                    <h1>{item.to.name}</h1>
                                    <p>{item.invoiceNumber}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p>{item.to.phoneNumber}</p>
                            </td>
                            <td className="px-6 py-4">{formatDate(item.dateCreated)}</td>
                            <td className="px-6 py-4">{formatDate(item.dueDate)}</td>
                            <td className="px-6 py-4">${item.totalAmount}</td>
                            <td className="px-6 py-4">
                                <p className={`border-2 inline-block py-1 px-5 rounded-lg ${statusClasses[item.status]}`}>
                                    {item.status}
                                </p>
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                <a 
                                    href={`/dashboard/List/edit/${item._id}`} 
                                    className="font-medium hover:underline"
                                >
                                    <UserRoundPen />
                                </a>
                                <a 
                                    href={`/dashboard/List/detail/${item._id}`} 
                                    className="font-medium hover:underline"
                                >
                                    <Eye />
                                </a>
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
                                    className="font-medium  hover:underline"
                                >
                                    <Trash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Invoice;
