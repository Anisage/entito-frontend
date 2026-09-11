/**
 * Format an amount for display.
 *
 * The API sends money as decimal STRINGS ("4500.00"), not numbers, so the
 * exact value survives the trip - a float can't hold every two-decimal
 * amount precisely, and rounding errors in prices are the kind of bug
 * nobody notices until a customer does.
 *
 * Parse only here, at the edge, purely to format. Never do arithmetic on
 * the result and send it back: the server computes every total.
 */
export const money = (amount: string | number | null | undefined): string => {
    const value = typeof amount === 'number' ? amount : parseFloat(amount ?? '0');
    if (Number.isNaN(value)) return 'KSh 0';
    return `KSh ${value.toLocaleString('en-KE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;
};
