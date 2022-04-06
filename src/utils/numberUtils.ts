export const numberWithCommas = ((x: any) => {
    return parseFloat(x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")).toFixed(2);
});
