export default function getNumberByScaledPercentage(start, end, percentage)
{
    const returnedNumber = start < end
        ? start + percentage * (end - start)
        : start - percentage * (start - end);

    return Math.floor(returnedNumber);
}
