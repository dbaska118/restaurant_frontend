import React, {useEffect, useState} from "react";
import {getAllOpeningHours} from "../api/openingHoursAPI.js";
import {FaInstagram, FaFacebook, FaTiktok} from "react-icons/fa";

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
        <div className="bg-amber-50 ">
            <div className="grid grid-cols-5 mx-auto">
                <div className="flex flex-col text-center items-center">
                    <p>Pałac smaku</p>
                    <p>NIP: 1234567899</p>
                    <p>Ignacego Paderewskiego 6</p>
                    <p>93-509 Łódź</p>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-center">NAWIGACJA</h1>
                    <button>
                        <p>Strona główna</p>
                    </button>
                    <button>
                        <p>Karta dań</p>
                    </button>
                    <button>
                        <p>Rezerwacje</p>
                    </button>
                    <button>
                        <p>Kontakt</p>
                    </button>
                    <button>
                        <p>Logowanie</p>
                    </button>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-center">POMOC</h1>
                    <button>
                        <p>Polityka prywatności</p>
                    </button>
                    <button>
                        <p>Regulamin rezerwacji</p>
                    </button>
                    <button>
                        <p>Alergeny</p>
                    </button>
                    <button>
                        <p>Często zadawane pytania (FAQ)</p>
                    </button>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-center">GODZINY OTWARCIA</h1>
                    {groupedOpeningHours.length === 0 && (
                        <p>Brak informacji o godzinach otwarcia</p>
                    )}
                    {groupedOpeningHours.map((openingHour) => (
                        <div key={openingHour.startDay} className="flex justify-between">
                            <p>
                                {openingHour.startDay === openingHour.endDay ?
                                    `${dayTranslations[openingHour.startDay]}` :
                                    `${dayTranslations[openingHour.startDay]} - ${dayTranslations[openingHour.endDay]}`
                                }
                            </p>
                            <p> {`${openingHour.openTime.slice(0,5)} - ${openingHour.closeTime.slice(0,5)}`}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-center">OBSERWUJ NAS</h1>
                    <div className="flex justify-center gap-3">
                        <FaFacebook/>
                        <FaInstagram/>
                        <FaTiktok/>
                    </div>
                </div>
            </div>
            <div className="border-t flex justify-between px-10">
                <p>© 2024 Pałac smaku. Wszelkie prawa zastrzeżone.</p>
                <p>Realizacja: Dawid Baska</p>
            </div>
        </div>
    )
}

export default Footer;
