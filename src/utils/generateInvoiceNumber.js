function generateInvoiceNumber() {
 
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
 
    return `INV-${randomDigits}`;
}
export default generateInvoiceNumber;

