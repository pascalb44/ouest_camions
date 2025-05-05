import React, { useState, useEffect } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { fr } from "date-fns/locale";
import { differenceInDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ truck, trailer, onDurationChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState(truck?.duration_truck || trailer?.duration_trailer || 0);


    const [reservedDates, setReservedDates] = useState([]); // to stock past reservations

    useEffect(() => {
        const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
        const validReservations = reservations
            .filter(res => res.startDate && res.endDate)
            .map(res => ({
                start: new Date(res.startDate),
                end: new Date(res.endDate)
            }));

        setReservedDates(validReservations);
    }, []);

    const DepartureContainer = ({ className, children }) => (
        <CalendarContainer className={className}>
            <div style={{ padding: "16px", background: "#216ba5", color: "#fff", textAlign: "center" }}>
                <strong>Choisissez votre date de départ</strong>
            </div>
            <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
    );

    const ReturnContainer = ({ className, children }) => (
        <CalendarContainer className={className}>
            <div style={{ padding: "16px", background: "#f39c12", color: "#fff", textAlign: "center" }}>
                <strong>Choisissez votre date de retour</strong>
            </div>
            <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
    );

    const formatDate = (date) => {
        if (!date) return "Aucune date sélectionnée";
        return date.toLocaleDateString("fr-FR"); // french date (jj/mm/aaaa)
    };

    const isDateAvailable = (date, vehicleId) => {
        const checkDate = new Date(date);

        return !reservedDates.some(reservation => {
            if (reservation.vehicleId === vehicleId) {
                const start = new Date(reservation.start);
                const end = new Date(reservation.end);
                return checkDate >= start && checkDate <= end;
            }
            return false;
        });
    };

    useEffect(() => {
        if (startDate && endDate) {
            const diff = differenceInDays(endDate, startDate);
            const newDuration = diff >= 0 ? diff : 0;
            setDuration(newDuration);
            if (onDurationChange) {
                onDurationChange(newDuration, startDate, endDate); // dates
            }
        }
    }, [startDate, endDate, onDurationChange]);

    const handleStartDateChange = (date) => {
        if (isDateAvailable(date, truck?.id || trailer?.id)) {  // Vérif date for the good vehicle
            setStartDate(date);
        } else {
            alert("Cette date est déjà réservée pour ce véhicule.");
        }
    };

    const handleEndDateChange = (date) => {
        if (isDateAvailable(date, truck?.id || trailer?.id)) { // Vérif date for the good vehicle
            setEndDate(date);
        } else {
            alert("Cette date est déjà réservée pour ce véhicule.");
        }
    };

    if (!truck && !trailer) return <p>Aucun chargement des informations du véhicule</p>;

    const vehicleType = truck ? "truck" : "trailer";

    return (
        <div className={`vehicle-picker-${vehicleType}`}>
            <div className={`date-picker-${vehicleType}`}>
                <div className={`date-picker-start-${vehicleType}`}>
                    <div className={`date-picker-start-legend-${vehicleType}`}>
                        Date de départ
                    </div>
                    <div className={`custom-date-picker-start-${vehicleType}`}>
                        <ReactDatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="dd/MM/yyyy"
                            className={`custom-date-picker-${vehicleType}`}
                            calendarContainer={DepartureContainer} //start date
                            locale={fr}
                            minDate={new Date()}  // to block past dates
                            filterDate={(date) => isDateAvailable(date, vehicleType === "truck" ? truck?.id : trailer?.id)}
                        />
                    </div>
                </div>
                <div className={`date-picker-end-${vehicleType}`}>
                    <div className={`date-picker-end-legend-${vehicleType}`}>
                        Date de retour
                    </div>
                    <div className={`custom-date-picker-end-${vehicleType}`}>
                        <ReactDatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                            className={`custom-date-picker-${vehicleType}`}
                            calendarContainer={ReturnContainer} // end date
                            locale={fr}
                            minDate={startDate} // end date after start date
                            filterDate={(date) => isDateAvailable(date, vehicleType === "truck" ? truck?.id : trailer?.id)} />
                    </div>
                </div>
            </div>
            <div className="selected-dates-truck selected-dates-trailer">
                <p><strong>Date de départ sélectionnée : </strong>{formatDate(startDate)}</p>
                <p><strong>Date de retour sélectionnée : </strong>{formatDate(endDate)}</p>
                <p><strong>Durée de location sélectionnée : </strong>{duration} jour(s)</p>
            </div>
        </div>
    );
};

export default CustomDatePicker;