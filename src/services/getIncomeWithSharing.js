export default function getIncomeWithSharing(start, end, percentage)
{
    let returnedNumber = false;
    if (start < end) {
        returnedNumber = ((end - start) * percentage + start);
    } else {
        returnedNumber = (start - (start - end) * percentage);
    }
    return Math.floor(returnedNumber);
}