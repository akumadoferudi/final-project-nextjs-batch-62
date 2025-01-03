export default function formatDate(inputDate: any) {
    // Parse the date string
    const date = new Date(inputDate);

    // Extract the day, month, and year
    const dayDate = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format as dd-mm-yyyy
    return `${dayDate}-${month}-${year}`;
}