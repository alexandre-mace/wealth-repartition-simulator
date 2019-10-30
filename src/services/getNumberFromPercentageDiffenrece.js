export default function getPercentageFromNumberDifference(start, end, percentage)
{
    return (start + percentage * (end - start));
}