export const numberWithCommas = ((x: any) => {
    return parseFloat(x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")).toFixed(2);
});

export function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};