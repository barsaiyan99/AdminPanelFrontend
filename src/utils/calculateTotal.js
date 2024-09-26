const calculateTotal = (
    items = [],
    ship = 0,
    discount = 0,
    tax = 0,

) => {
    const subtotal = items.reduce((acc, item) => {
        const priceNum = parseFloat(item.price) || 0
        const quantityNum = parseFloat(item.quantity) || 1
        return acc + priceNum * quantityNum
    }, 0)

    const discountNum = parseFloat(discount) || 0
    const taxNum = parseFloat(tax) || 0

    const subtotalAfterDiscount = subtotal - discountNum
    const taxAmount = (taxNum / 100) * subtotalAfterDiscount
    const totalAmount = subtotalAfterDiscount + taxAmount + parseFloat(ship)
    console.log(totalAmount)

    return totalAmount
}
export default calculateTotal
