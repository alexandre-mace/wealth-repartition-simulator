export default function getScaledPercentageByNumber(start, end, number)
{
    return ((number - start) / (end - start)) * 100;
}