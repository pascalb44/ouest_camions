export const calculatePrice = (duration, pricePerDay, pricePerWeek, pricePerMonth, pricePerYear) => {
    // Valider les prix pour s'assurer qu'ils sont des nombres valides
    pricePerDay = parseFloat(pricePerDay);
    pricePerWeek = parseFloat(pricePerWeek);
    pricePerMonth = parseFloat(pricePerMonth);
    pricePerYear = parseFloat(pricePerYear);

    if (isNaN(pricePerDay) || isNaN(pricePerWeek) || isNaN(pricePerMonth) || isNaN(pricePerYear)) {
        console.error("Certains prix sont invalides");
        return 0; // Retourner 0 si l'un des prix est invalide
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
