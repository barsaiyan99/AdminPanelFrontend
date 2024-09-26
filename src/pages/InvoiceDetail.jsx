import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Download, Printer } from "lucide-react"
import http from "../libs/http"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.pdfMake.vfs

const backendURL = "http://localhost:3000"

const InvoiceDetail = () => {
    const [loadedData, setLoadedData] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(
                    `${backendURL}/auth/dashboard/edit/${id}`
                )
                setLoadedData(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error)
                setLoading(false)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    const generatePDF = () => {
        if (!loadedData) return

        const subtotal = loadedData.items.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
        )

        const docDefinition = {
            content: [
                { text: "Invoice Details", style: "header" },
                {
                    columns: [
                        {
                            width: "*",
                            text: [
                                { text: "From\n", bold: true },
                                `${loadedData.from.name}\n`,
                                `${loadedData.from.address}\n`,
                                `${loadedData.from.phoneNumber}\n`,
                                `Date Created: ${new Date(loadedData.dateCreated).toLocaleDateString()}\n`,
                            ],
                        },
                        {
                            width: "*",
                            text: [
                                { text: "To\n", bold: true },
                                `${loadedData.to.name}\n`,
                                `${loadedData.to.address}\n`,
                                `${loadedData.to.phoneNumber}\n`,
                                `Due Date: ${new Date(loadedData.dueDate).toLocaleDateString()}\n`,
                            ],
                            alignment: "right",
                        },
                    ],
                },
                { text: "Items", style: "subheader" },
                {
                    table: {
                        widths: ["*", "*", "*", "*", "*", "*"],
                        body: [
                            [
                                { text: "#", style: "tableHeader" },
                                { text: "Name", style: "tableHeader" },
                                { text: "Description", style: "tableHeader" },
                                { text: "Quantity", style: "tableHeader" },
                                { text: "Price", style: "tableHeader" },
                                { text: "Total", style: "tableHeader" },
                            ],
                            ...loadedData.items.map((item, index) => [
                                (index + 1).toString(),
                                item.itemName,
                                item.description,
                                item.quantity.toString(),
                                `$${item.price.toFixed(2)}`,
                                `$${(item.quantity * item.price).toFixed(2)}`,
                            ]),
                        ],
                    },
                },
                { text: `Subtotal: $${subtotal.toFixed(2)}`, style: "footer" },
                {
                    text: `Shipping: $${loadedData.shipping.cost.toFixed(2)}`,
                    style: "footer",
                },
                {
                    text: `Discount: $${loadedData.discount.amount.toFixed(2)}`,
                    style: "footer",
                },
                { text: `Taxes: ${loadedData.taxes.amount}%`, style: "footer" },
                {
                    text: `Total: $${loadedData.totalAmount.toFixed(2)}`,
                    style: "footer",
                },
            ],
            styles: {
                header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
                subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
                tableHeader: { bold: true, fontSize: 12, fillColor: "#eeeeee" },
                footer: {
                    fontSize: 12,
                    margin: [0, 10, 0, 0],
                    alignment: "right",
                },
            },
        }

        return docDefinition
    }

    const handlePrint = () => {
        const docDefinition = generatePDF()
        if (docDefinition) {
            pdfMake.createPdf(docDefinition).print()
        }
    }

    const handleDownload = () => {
        const docDefinition = generatePDF()
        if (docDefinition) {
            pdfMake.createPdf(docDefinition).download(`invoice_${id}.pdf`)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!loadedData) {
        return <div>No data available</div>
    }
    const subtotal = loadedData.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    )
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Invoice Details</h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center text-lg gap-2 px-4 py-2 rounded-lg border-2 border-gray-500"
                        onClick={handlePrint}
                    >
                        <Printer />
                        <p>Print</p>
                    </button>
                    <button
                        className="flex items-center text-lg gap-2 rounded-lg text-white bg-blue-500 px-4 py-2"
                        onClick={handleDownload}
                    >
                        <Download />
                        <p>Download</p>
                    </button>
                </div>
            </div>
            <div className="border-2 p-8 rounded-xl">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <h2 className="text-lg font-semibold">From</h2>
                        <p>{loadedData.from.name}</p>
                        <p>{loadedData.from.address}</p>
                        <p>{loadedData.from.phoneNumber}</p>
                        <p className="mt-4">
                            <strong>Date Created:</strong>{" "}
                            {new Date(
                                loadedData.dateCreated
                            ).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-center">
                        <h1 className="text-lg font-semibold">Status</h1>
                        <p>{loadedData.status}</p>
                    </div>
                    <div className="text-end">
                        <h2 className="text-lg font-semibold">To</h2>
                        <p>{loadedData.to.name}</p>
                        <p>{loadedData.to.address}</p>
                        <p>{loadedData.to.phoneNumber}</p>
                        <p className="mt-4">
                            <strong>Due Date:</strong>{" "}
                            {new Date(loadedData.dueDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Items</h2>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">
                                    Description
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Quantity
                                </th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadedData.items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>{" "}
                                    {/* Use index + 1 here */}
                                    <td className="px-4 py-2">
                                        {item.itemName}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.description}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.quantity}
                                    </td>
                                    <td className="px-4 py-2">${item.price}</td>
                                    <td className="px-4 py-2">
                                        $
                                        {(item.quantity * item.price).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="h-[2px] w-full border-2 my-14"></div>
                <div className="mt-4 grid grid-cols-3">
                    <div className="col-span-2">
                        <h1 className="font-semibold text-lg">NOTES</h1>
                        <p>
                            We appreciate your business. Should you need to add
                            VAT or extra notes, let us know.
                        </p>
                    </div>
                    <div>
                        <div>
                            <div className="flex justify-between">
                                <h1 className="text-lg leading-relaxed tracking-widest">
                                    Subtotal:
                                </h1>
                                <p className="text-lg">
                                    ${subtotal.toFixed(2)}
                                </p>
                            </div>
                            <div className="h-[2px] w-full border-2 my-2"></div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h1 className="text-lg leading-relaxed tracking-widest">
                                    Shipping:
                                </h1>
                                <p className="text-lg">
                                    ${loadedData.shipping.cost.toFixed(2)}
                                </p>
                            </div>
                            <div className="h-[2px] w-full border-2 my-2"></div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h1 className="text-lg leading-relaxed tracking-widest">
                                    Discount:
                                </h1>
                                <p className="text-lg">
                                    ${loadedData.discount.amount.toFixed(2)}
                                </p>
                            </div>
                            <div className="h-[2px] w-full border-2 my-2"></div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h1 className="text-lg leading-relaxed tracking-widest">
                                    Taxes:
                                </h1>
                                <p className="text-lg">
                                    {loadedData.taxes.amount}%
                                </p>
                            </div>
                            <div className="h-[2px] w-full border-2 my-2"></div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <h1 className="text-xl font-semibold leading-relaxed tracking-widest">
                                    Total:
                                </h1>
                                <p className="text-xl">
                                    ${loadedData.totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetail
