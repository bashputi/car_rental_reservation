export const calculationTotalDurationTime = (
    startTime: string,
    endTime: string,
    pricePerHour: number
): number => {
    const [startHour, startMint] = startTime?.split(":").map(Number);
    const startHourAndMint = startHour * 60 + startMint;
    const [endHour, endMint] = endTime?.split(":").map(Number);
    const endtHourAndMInt = endHour * 60 + endMint;
    const totalDuration = (endtHourAndMInt - startHourAndMint) / 60;
    const newTotalCost = totalDuration * pricePerHour;
    return newTotalCost;
};