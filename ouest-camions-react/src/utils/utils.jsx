export const calculatePrice = (duration, pricePerDay, pricePerWeek, pricePerMonth, pricePerYear) => {
    // Valid prices to check if there are valid numbers
    pricePerDay = parseFloat(pricePerDay);
    pricePerWeek = parseFloat(pricePerWeek);
    pricePerMonth = parseFloat(pricePerMonth);
    pricePerYear = parseFloat(pricePerYear);

    if (isNaN(pricePerDay) || isNaN(pricePerWeek) || isNaN(pricePerMonth) || isNaN(pricePerYear)) {
        console.error("Certains prix sont invalides");
        return 0; // Return 0 if one price is invalid
    }


    if (!duration || duration <= 0) {
        console.warn("Durée invalide :", duration);
        return 0;
    }

    let totalPrice = 0;

    // calcul price per year
    const years = Math.floor(duration / 365);
    totalPrice += years * pricePerYear;
    duration -= years * 365;


    // calcul price per month
    const months = Math.floor(duration / 30);
    totalPrice += months * pricePerMonth;
    duration -= months * 30;


    // calcul price per week
    const weeks = Math.floor(duration / 7);
    totalPrice += weeks * pricePerWeek;
    duration -= weeks * 7;

    totalPrice += duration * pricePerDay;

    return totalPrice;
};


export const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
