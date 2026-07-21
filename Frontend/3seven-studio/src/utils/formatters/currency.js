/**
 * Format currency in INR
 */
export const formatCurrency = (
    amount,
    currency = "INR",
    locale = "en-IN"
) => {
    const value = Number(amount || 0);

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};