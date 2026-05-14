import React, {useEffect, useState} from "react";
import {getAllOpeningHours} from "../api/openingHoursAPI.js";
import {FaInstagram, FaFacebook, FaTiktok} from "react-icons/fa";
import {ArrowRight } from 'lucide-react';
import {useAuth} from "../AuthContext.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Footer() {
    const [groupedOpeningHours, setGroupedOpeningHours] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [weekDayNumber, setWeekDayNumber] = useState(0);
    const [newsletterMail, setNewsletterMail] = useState("");
    const { accessToken, user } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        getAllOpeningHours()
            .then(result => {
                groupOpeningHours(result)
                isRestaurantOpen(result)
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

    const dayNumber = {
        "MONDAY": 1,
        "TUESDAY": 2,
        "WEDNESDAY": 3,
        "THURSDAY": 4,
        "FRIDAY": 5,
        "SATURDAY": 6,
        "SUNDAY": 7
    }

    const groupOpeningHours = (openingHours) => {
        if( openingHours.length > 0 ) {
            let start = openingHours[0]
            let grouppedHours = []
            for(let i = 1; i <= openingHours.length; i++) {
                let current = openingHours[i]
                if(!current || start.openTime !== current.openTime || start.closeTime !== current.closeTime) {
                   grouppedHours.push({
                       startDay: start.dayOfWeek,
                       startDayNumber: dayNumber[start.dayOfWeek],
                       endDay: openingHours[i-1].dayOfWeek,
                       endDayNumber: dayNumber[openingHours[i-1].dayOfWeek],
                       openTime: start.openTime,
                       closeTime: start.closeTime
                   })
                   if(current){
                       start = current
                   }
               }
            }
            setGroupedOpeningHours(grouppedHours)
        }
    }

    const isRestaurantOpen = (openingHours) => {
        if( openingHours.length > 0 ) {
            const now = new Date()
            const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

            const today = weekDays[now.getDay()]
            const dataToCheck = openingHours.find((openingHours) => openingHours.dayOfWeek === today);

            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            const openTimeMinutes = Number(dataToCheck.openTime.slice(0,2)) * 60 + Number(dataToCheck.openTime.slice(3,5));
            const closeTimeMinutes = Number(dataToCheck.closeTime.slice(0,2)) * 60 + Number(dataToCheck.closeTime.slice(3,5));

            setIsOpen((nowMinutes >= openTimeMinutes && nowMinutes < closeTimeMinutes))
            setWeekDayNumber(dayNumber[dataToCheck.dayOfWeek])
        }
    }



    const signInToNewsletter = () => {
        if(newsletterMail.length > 5) {
            setNewsletterMail("");
            toast.success("Zapisano do newslettera!", {
                className: 'min-w-[450px]',
            });
        }
        else {
            toast.error("Wprowadzony adres e-mail jest błędny!", {
                className: 'min-w-[450px]',
            });
        }
    }

    const navigateToPage = (source) => {
        window.scroll(0, 0)
        navigate(source);
    }

    const AccountClick = async () => {
        if(!accessToken || !user) {
            navigate("/login");
        }
        else if(user.role === "client"){
            navigate("/userpanel");
        }
        else if(user.role === "admin" || user.role === "headAdmin"){
            navigate("/adminpanel");
        }
        else if(user.role === "employee"){
            navigate("/employeepanel");
        }
    }


    return (
        <div className="bg-amber-50 ">
            <div className="grid grid-cols-6 mx-auto pt-3 pb-5 text-footertext text-lg">
                <div className="flex flex-col text-center items-center ">
                    <p className="font-serif text-logotext text-2xl mt-6">Pałac smaku</p>
                    <p>NIP: 1234567899</p>
                    <p>Ignacego Paderewskiego 6</p>
                    <p>93-509 Łódź</p>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-center font-serif text-logotext text-xl mb-1">NAWIGACJA</h1>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer" onClick={() => navigateToPage("/")}>
                        <p>Strona główna</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer" onClick={() => navigateToPage("/dishes")}>
                        <p>Karta dań</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer" onClick={() => navigateToPage("/reservations")}>
                        <p>Rezerwacje</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer" onClick={() => navigateToPage("/contact")}>
                        <p>Kontakt</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer" onClick={() => AccountClick()}>
                        {(!user && !accessToken) && (
                            <p>Logowanie</p>
                        )}
                        {(user && accessToken) && (
                            <p>Moje konto</p>
                        )}
                    </button>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-center font-serif text-logotext text-xl mb-1">POMOC</h1>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer">
                        <p>Polityka prywatności</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer">
                        <p>Regulamin rezerwacji</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer">
                        <p>Alergeny w posiłkach</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer">
                        <p>Często zadawane pytania (FAQ)</p>
                    </button>
                    <button className="hover:text-logotext hover:underline hover:underline-offset-6 cursor-pointer">
                        <p>Mapa strony</p>
                    </button>
                </div>
                <div className="flex flex-col col-span-2 px-24">
                    <h1 className="text-center font-serif text-logotext text-xl mb-1">GODZINY OTWARCIA</h1>
                    {groupedOpeningHours.length === 0 && (
                        <p>Brak informacji o godzinach otwarcia</p>
                    )}
                    {groupedOpeningHours.map((openingHour) => (
                        <div key={openingHour.startDay} className="flex w-full">
                            <p className="w-1/3 text-left">
                                    {openingHour.startDay === openingHour.endDay ?
                                        `${dayTranslations[openingHour.startDay]}` :
                                        `${dayTranslations[openingHour.startDay]} - ${dayTranslations[openingHour.endDay]}`
                                    }
                            </p>
                            <p className="w-1/3 text-center"> {`${openingHour.openTime.slice(0,5)} - ${openingHour.closeTime.slice(0,5)}`}</p>
                            {(weekDayNumber >= openingHour.startDayNumber && weekDayNumber <= openingHour.endDayNumber) && (
                                <div className="w-1/3 flex justify-end items-center gap-1">
                                    <div className={`w-4 h-4 rounded-full  animate-pulse ${isOpen ? `bg-green-600` : `bg-red-600`} `}></div>
                                    <p>{isOpen ? "Otwarte" : "Zamknięte"}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-center font-serif text-logotext text-xl mb-3">OBSERWUJ NAS</h1>
                    <div className="flex justify-center  gap-6 mb-5">
                        <button
                            onClick={() => window.open("https://www.facebook.com/", "_blank", "noopener,noreferrer")}
                            className="cursor-pointer border-2 rounded-full border-footertext p-2 hover:bg-footertext hover:text-amber-50">
                            <FaFacebook className="w-8 h-auto"/>
                        </button>
                        <button
                            onClick={() => window.open("https://www.instagram.com", "_blank", "noopener,noreferrer")}
                            className="cursor-pointer border-2 rounded-full border-footertext p-2 hover:bg-footertext hover:text-amber-50">
                            <FaInstagram className="w-8 h-auto"/>
                        </button>
                        <button
                            onClick={() => window.open("https://www.tiktok.com/pl-PL/", "_blank", "noopener,noreferrer")}
                            className="cursor-pointer border-2 rounded-full border-footertext p-2 hover:bg-footertext hover:text-amber-50">
                            <FaTiktok className="w-8 h-auto"/>
                        </button>
                    </div>
                    <label className="text-center">Zapisz się do newslettera:</label>
                    <div className="flex justify-center border-b border-footertext w-4/5 px-10 pb-0.5">
                        <input
                            className="placeholder:text-footertext placeholder:opacity-80"
                            type="text"
                            name="email"
                            placeholder="Adres e-mail"
                            value={newsletterMail}
                            onChange={(e) => setNewsletterMail(e.target.value)}
                        />
                        <button className="cursor-pointer border-2 border-footertext  rounded-full hover:bg-footertext hover:text-amber-50" onClick={() => signInToNewsletter()}>
                            <ArrowRight className="hover:scale-125"/>
                        </button>
                    </div>
                </div>
                <div/>
            </div>
            <div className="border-t flex justify-between px-10 py-2 text-footertext">
                <p>© {new Date().getFullYear()} Pałac smaku. Wszelkie prawa zastrzeżone.</p>
                <p>Realizacja: Dawid Baska</p>
            </div>
        </div>
    )
}

export default Footer;
