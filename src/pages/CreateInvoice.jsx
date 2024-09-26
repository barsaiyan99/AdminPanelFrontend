import React, { useEffect, useState } from "react"
import { ArrowDownToLine, Trash2, Plus } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import http from "../libs/http"
import { useNavigate } from "react-router-dom"
import generateInvoiceNumber from "../utils/generateInvoiceNumber"
import calculateTotal from "../utils/calculateTotal"
const backendURL = "http://localhost:3000"

const CreateInvoice = () => {
     const navigate = useNavigate()
    const [totalValue,setTotalValue]=useState(0)
   
    const { register, handleSubmit, control, watch, reset } = useForm({
        defaultValues: {
            invoiceNumber: generateInvoiceNumber(),
            dueDate: new Date(),
            dateCreated: new Date(),
            status: "pending",
            from: {
                name: "",
                phoneNumber: "",
                address: "",
            },
            to: {
                name: "",
                phoneNumber: "",
                address: "",
            },
            items: [{ itemName: "", quantity: 1, price: 0, description: "" }],
            shipping: { cost: 0 },
            discount: { amount: 0 },
            taxes: { amount: 0 },
            totalAmount:totalValue,
        },
    })

    const {
        fields: itemFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "items",
    })
     
    const submitForm = async (data) => {
        try {
            const calculatedTotal = calculateTotal(
                data.items,
                data.shipping.cost || 0,
                data.discount.amount || 0,
                data.taxes.amount || 0
            );
            data.totalAmount = calculatedTotal;

            await http.post(`${backendURL}/auth/dashboard/create`, data);
          
            reset();
            navigate("/dashboard/list")
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
     const items = watch("items");
     const shipping = watch("shipping")
     console.log(shipping)
     const discount = watch("discount")
     const taxes = watch("taxes");
     useEffect(() => {
        const total = calculateTotal(
            items,
            shipping?.cost || 0,
            discount?.amount || 0,
            taxes?.amount || 0 
        );
        setTotalValue(total);
    }, [items, shipping?.cost, discount?.amount, taxes?.amount,items[0]?.price]);
    return (
        <div className="">
            <div className="flex justify-between mb-20">
                <h1 className="text-2xl font-bold">Create Invoice</h1>
                <button className="px-4 py-2 flex gap-2 bg-gray-200 rounded-lg">
                    <ArrowDownToLine />
                    <p>Import</p>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                {/* Sender */}
                <div className="sender grid grid-cols-4">
                    <div className="sidehead">
                        <h1 className="text-xl font-semibold">From:</h1>
                        <p>From he who is sending this invoice</p>
                    </div>
                    <div className="col-span-3">
                        <div className="flex mb-3 gap-5">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="fromName">Name</label>
                                <input
                                    type="text"
                                    id="fromName"
                                    {...register("from.name", {
                                        required: "Name is required",
                                    })}
                                    placeholder="Enter Your Name"
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="fromPhoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="fromPhoneNumber"
                                    {...register("from.phoneNumber", {
                                        required: "Phone number is required",
                                    })}
                                    placeholder="Enter Your Phone Number"
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fromAddress">Address</label>
                            <textarea
                                id="fromAddress"
                                {...register("from.address", {
                                    required: "Address is required",
                                })}
                                placeholder="Enter Your Address"
                                className="border-2 border-gray-200 py-4 px-2 rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-[1px] border-dashed border-2 border-gray-200 my-10"></div>

                {/* Recipient */}
                <div className="sender grid grid-cols-4">
                    <div className="sidehead">
                        <h1 className="text-xl font-semibold">To:</h1>
                        <p>To he who will receive this invoice</p>
                    </div>
                    <div className="col-span-3">
                        <div className="flex mb-3 gap-5">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="toName">Name</label>
                                <input
                                    type="text"
                                    id="toName"
                                    {...register("to.name", {
                                        required: "Name is required",
                                    })}
                                    placeholder="Enter Recipient's Name"
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="toPhoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="toPhoneNumber"
                                    {...register("to.phoneNumber", {
                                        required: "Phone number is required",
                                    })}
                                    placeholder="Enter Recipient's Phone Number"
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="toAddress">Address</label>
                            <textarea
                                id="toAddress"
                                {...register("to.address", {
                                    required: "Address is required",
                                })}
                                placeholder="Enter Recipient's Address"
                                className="border-2 border-gray-200 py-4 px-2 rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <div className="h-[1px] border-dashed border-2 border-gray-200 my-10"></div>

                {/* Schedule */}
                <div className="sender grid grid-cols-4">
                    <div className="sidehead">
                        <h1 className="text-xl font-semibold">Schedule:</h1>
                        <p>Invoice details and schedule</p>
                    </div>
                    <div className="col-span-3">
                        <div className="flex mb-3 gap-5">
                            <div className="flex flex-col w-1/4">
                                <label htmlFor="invoiceNumber">
                                    Invoice Number
                                </label>
                                <input
                                    type="text"
                                    id="invoiceNumber"
                                    {...register("invoiceNumber", {
                                        required: "Invoice number is required",
                                    })}
                                    value={generateInvoiceNumber()}
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col w-1/4">
                                <label
                                    htmlFor="dateCreated"
                                    className="flex items-center gap-2"
                                >
                                    Date Created
                                </label>
                                <input
                                    type="date"
                                    id="dateCreated"
                                    {...register("dateCreated", {
                                        required: "Date is required",
                                    })}
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                    max={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                            <div className="flex flex-col w-1/4">
                                <label
                                    htmlFor="dueDate"
                                    className="flex items-center gap-2"
                                >
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    {...register("dueDate", {
                                        required: "Date is required",
                                    })}
                                    className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-1/4">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    {...register("status", {
                                        required: "Status is required",
                                    })}
                                    className="border-2 border-gray-200 bg-white py-2 px-2 rounded-md"
                                >
                                    <option value="" disabled>
                                        Select status
                                    </option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="overdue">Overdue</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] border-dashed border-2 border-gray-200 my-10"></div>

                {/* Item Details */}
                <div className="sender grid grid-cols-4">
                    <div className="sidehead">
                        <h1 className="text-xl font-semibold">Item Details:</h1>
                        <p>Add One Or Multiple Items</p>
                    </div>
                    <div className="col-span-3 border-2 rounded-lg p-8">
                        {itemFields.map((item, index) => (
                            <div key={item.id} className="mb-4 border-b pb-4">
                                <div className="flex mb-3 gap-5">
                                    <div className="flex flex-col w-1/2">
                                        <label
                                            htmlFor={`items[${index}].itemName`}
                                        >
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`items[${index}].itemName`}
                                            {...register(
                                                `items[${index}].itemName`,
                                                {
                                                    required:
                                                        "Item Name is required",
                                                }
                                            )}
                                            placeholder="Enter Item Name"
                                            className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/4">
                                        <label
                                            htmlFor={`items[${index}].quantity`}
                                        >
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            id={`items[${index}].quantity`}
                                            {...register(
                                                `items[${index}].quantity`,
                                                {
                                                    required:
                                                        "Quantity is required",
                                                }
                                            )}
                                            placeholder="Enter Quantity"
                                            className="border-2 border-gray-200 py-2 px-2 rounded-md"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/4">
                                        <label
                                            htmlFor={`items[${index}].price`}
                                        >
                                            Price
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id={`items[${index}].price`}
                                                {...register(
                                                    `items[${index}].price`,
                                                    {
                                                        required:
                                                            "Price is required",
                                                    }
                                                )}
                                                className="pl-6 pr-4 py-2 border-2 border-gray-200 rounded-md"
                                            />
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                $
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor={`items[${index}].description`}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id={`items[${index}].description`}
                                        {...register(
                                            `items[${index}].description`,
                                            {
                                                required:
                                                    "Description is required",
                                            }
                                        )}
                                        placeholder="Enter Item Description"
                                        className="border-2 border-gray-200 py-4 px-2 rounded-md"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="flex gap-1 px-4 py-2 mt-4 rounded-lg text-red-500"
                                >
                                    <Trash2 size={24} />
                                    <p className="text-red-500 text-lg font-semibold">
                                        Remove
                                    </p>
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() =>
                                    append({
                                        itemName: "",
                                        quantity: 1,
                                        price: 0,
                                        description: "",
                                    })
                                }
                                className="px-4 py-2 rounded-lg bg-gray-200 flex items-center gap-1"
                            >
                                <Plus />
                                <p>Add Item</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Shipping, Discount, and Taxes */}
                <div className="grid grid-cols-4 mt-8">
                    <div></div>
                    <div className="col-span-3 flex gap-24">
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="shipping">Shipping</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="shipping"
                                    {...register("shipping.cost", {
                                        required: "Shipping cost is required",
                                    })}
                                
                                    className="pl-6 pr-4 py-2 border-2 border-gray-200 rounded-md"
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="discount">Discount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="discount"
                                    {...register("discount.amount", {
                                        required: "Discount amount is required",
                                    })}
                                   
                                    className="pl-6 pr-4 py-2 border-2 border-gray-200 rounded-md"
                                />
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    $
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="taxes">Taxes</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="taxes"
                                    {...register("taxes.amount", {
                                        required: "Tax amount is required",
                                    })}
                                   
                                    className="pl-6 pr-4 py-2 border-2 border-gray-200 rounded-md"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Calculation */}
                <div className="flex justify-end mt-10">
                    <div className="space-y-2 text-lg tracking-widest">
                        <h1 className="flex gap-4">
                            Subtotal:  <p>${items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</p>
                        </h1>
                        <h1 className="flex gap-4">
                            Shipping: <p>${shipping.cost || "0.00"}</p>
                        </h1>
                        <h1 className="flex gap-4">
                            Discount: <p>${discount.amount || "0.00"}</p>
                        </h1>
                        <h1 className="flex gap-4">
                            Taxes: <p>{taxes.amount || "0.00"}%</p>
                        </h1>
                        <h1 className="text-lg font-semibold flex gap-4">
                            Total: <p>${totalValue.toFixed(2)}</p>
                        </h1>
                    </div>
                </div>

                {/* Submit Button */}
                <footer className="sticky bottom-0 right-0 w-full rounded-lg backdrop-blur-md bg-white/30">
                    <div className="flex justify-end py-2 rounded-lg">
                        <button
                            type="submit"
                            className="text-white px-4 py-2 bg-blue-500 rounded-lg text-lg"
                        >
                            Create Invoice
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    )
}

export default CreateInvoice
