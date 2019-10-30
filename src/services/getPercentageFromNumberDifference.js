export default function getPercentageFromNumberDifference(start, end, number)
{
    return ((number - start) / (end - start)) * 100;
}