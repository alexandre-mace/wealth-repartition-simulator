export default function getIncomePercentageFromIncome(start, end, number)
{
    return ((number - start) / (end - start)) * 100;
}