import React, { useState, useEffect, useCallback } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { fr } from "date-fns/locale";
import { differenceInDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ truck, onDurationChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [duration, setDuration] = useState(truck?.duration_truck || 0);     /* duration_truck  is in base */

    /* to get the difference between start and end of the location's dates */

    // calendar for start of location
    const DepartureContainer = ({ className, children }) => (
        <CalendarContainer className={className}>
            <div style={{ padding: "16px", background: "#216ba5", color: "#fff", textAlign: "center" }}>
                <strong>Choisissez votre date de départ</strong>
            </div>
            <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
    );

    // calendar for end of location
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
        return date.toLocaleDateString("fr-FR"); // french format (jj/mm/aaaa)
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

    const updateDuration = useCallback(() => {
        if (!truck) return; 
        fetch(`/api/trucks/${truck.id_truck}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ duration_truck: duration }),
        });
    }, [truck, duration]);

    useEffect(() => {
        if (duration > 0 && truck) {
            updateDuration();
        }
    }, [duration, truck, updateDuration]);
    if (!truck) return <p>Aucun chargement des informations du camion</p>;

    return (
        <div>
            <div className="date-picker">
                <div className="date-picker-start">
                    <div className="date-picker-start-legend">
                        Date de départ
                    </div>
                    <div className="custom-date-picker-start">
                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="custom-date-picker"
                            calendarContainer={DepartureContainer} // for start date
                            locale={fr} // french format (jj/mm/aaaa)
                        />
                    </div>
                </div>
                <div className="date-picker-end">
                    <div className="date-picker-end-legend">
                        Date de retour
                    </div>
                    <div className="custom-date-picker-end">
                        <ReactDatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="custom-date-picker"
                            calendarContainer={ReturnContainer} // for end date
                            locale={fr}  // french format (jj/mm/aaaa)
                        />
                    </div>
                </div>
            </div>
            <div className="selected-dates">
                <p><strong>Date de départ sélectionnée : </strong>{formatDate(startDate)}</p>
                <p><strong>Date de retour sélectionnée : </strong>{formatDate(endDate)}</p>
                <p><strong>Durée de location sélectionnée : </strong>{duration} jour(s)</p>
            </div>
        </div>
    );
};

export default CustomDatePicker;