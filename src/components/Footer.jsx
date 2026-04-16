import {useEffect, useState} from "react";
import {getAllOpeningHours} from "../api/openingHoursAPI.js";

function Footer() {
    const [groupedOpeningHours, setGroupedOpeningHours] = useState([]);

    useEffect(() => {
        getAllOpeningHours()
            .then(result => {
                groupOpeningHours(result)
            })
        .catch(error => {
            console.log(error);
        })
    },[])

    const dayTranslations = {
        "MONDAY": "pon.",
        "TUESDAY": "wt.",
        "WEDNESDAY": "śr.",
        "THURSDAY": "czw.",
        "FRIDAY": "pt.",
        "SATURDAY": "sob.",
        "SUNDAY": "niedz."
    };

    const groupOpeningHours = (openingHours) => {
        if( openingHours.length > 0 ) {
            let start = openingHours[0]
            let grouppedHours = []
            for(let i = 1; i <= openingHours.length; i++) {
                let current = openingHours[i]
                if(!current || start.openTime !== current.openTime || start.closeTime !== current.closeTime) {
                   grouppedHours.push({
                       startDay: start.dayOfWeek,
                       endDay: openingHours[i-1].dayOfWeek,
                       openTime: start.openTime,
                       closeTime: start.closeTime
                   })
                   if(current){
                       start = current
                   }
               }
            }
            console.log(grouppedHours)
            setGroupedOpeningHours(grouppedHours)
        }
    }






    return (
        <div className="bg-amber-50">
            <div className="grid grid-cols-2">
                <div className="flex flex-col">
                    <h1>GODZINY OTWARCIA:</h1>
                    {groupedOpeningHours.length === 0 && (
                        <p>Brak informacji o godzinach otwarcia</p>
                    )}
                    {groupedOpeningHours.map((openingHour) => (
                        <div key={openingHour.startDay}>
                            <p>
                                <span>
                                    {openingHour.startDay === openingHour.endDay ?
                                        `${dayTranslations[openingHour.startDay]}` :
                                        `${dayTranslations[openingHour.startDay]} - ${dayTranslations[openingHour.endDay]}`
                                    }
                                </span>
                                {`${openingHour.openTime.slice(0,5)} - ${openingHour.closeTime.slice(0,5)}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <p>@Pałac smaku</p>
        </div>
    )
}

export default Footer;
