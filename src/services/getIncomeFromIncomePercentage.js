export default function getIncomeFromIncomePercentage(start, end, percentage)
{
    return (start + percentage * (end - start));
}