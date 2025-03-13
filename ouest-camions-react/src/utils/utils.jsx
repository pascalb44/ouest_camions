export const calculatePrice = (duration, pricePerDay, pricePerWeek, pricePerMonth, pricePerYear) => {
    // calcul price per year
    if (duration >= 365) {
        const years = Math.floor(duration / 365);
        const remainingDays = duration % 365;
        return years * pricePerYear + calculatePrice(remainingDays, pricePerDay, pricePerWeek, pricePerMonth, pricePerYear);
    }
    // calcul price per month

    if (duration >= 30) {
        const months = Math.floor(duration / 30);
        const remainingDays = duration % 30;
        return months * pricePerMonth + calculatePrice(remainingDays, pricePerDay, pricePerWeek, pricePerMonth, pricePerYear);
    }
    // calcul price per week

    if (duration >= 7) {
        const weeks = Math.floor(duration / 7);
        const remainingDays = duration % 7;
        return weeks * pricePerWeek + calculatePrice(remainingDays, pricePerDay, pricePerWeek, pricePerMonth, pricePerYear);
    }
    return duration * pricePerDay;    
};

