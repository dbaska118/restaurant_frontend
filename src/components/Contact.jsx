import Menu from "./Menu.jsx";
import React, {useState} from "react";
import {toast, ToastContainer} from 'react-toastify';

function Contact() {
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");


    const sendMessage = (e) => {
        e.preventDefault();
        if(message === "" || topic === "" || email === "") {
            toast.error("Nie uzupełniono wszystkich pól!", {
                className: 'min-w-[450px]',
            });
        }
        else {
            setEmail("")
            setMessage("")
            setTopic("")
            toast.success("Wysłano wiadomość!", {
                className: 'min-w-[450px]',
            });
        }
    }

    return (
        <div>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <Menu/>
            <div className="mx-10 mt-52 mb-16">
                <h2 className="text-4xl font-semibold text-center">Skontaktuj się z nami!</h2>
                <div className="grid grid-cols-2 mt-10 mb-10">
                    <div className="text-2xl text-center">
                        <p className="text-3xl font-semibold mb-6">Pałac smaku</p>
                        <p>Ignacego Paderewskiego 6</p>
                        <p>93-509 Łódź</p>
                        <p className="mt-10 font-semibold">Kontakt telefoniczny:</p>
                        <div className="grid grid-cols-2 mt-4">
                            <div>
                                <p className="mb-2">Telefon komórkowy:</p>
                                <p>+48 513 703 62</p>
                            </div>
                            <div>
                                <p className="mb-2">Telefon stacjonarny:</p>
                                <p>+48 52 333 090</p>
                            </div>
                        </div>
                        <p className="mt-10 mb-4 font-semibold">Kontakt mailowy:</p>
                        <p>kontakt@palac-smaku.pl</p>

                    </div>
                    <form onSubmit={sendMessage}>
                        <div className="flex flex-col text-2xl">
                            <label>Adres e-mail:</label>
                            <input
                                className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-4 outline-none focus:border-logotexthover"
                                type="text"
                                name="email"
                                placeholder="Adres e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />

                            <label>Temat:</label>
                            <input
                                className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-4 outline-none focus:border-logotexthover"
                                type="text"
                                name="topic"
                                placeholder="Temat"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)} />

                            <label>Wiadomość:</label>
                            <textarea
                                className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-10 outline-none focus:border-logotexthover"
                                name="message"
                                value={message}
                                rows={5}
                                placeholder="Twoja wiadomość"
                                onChange={(e) => setMessage(e.target.value)} />

                            <button type="submit"  className="border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Wyślij wiadomość</button>
                        </div>
                    </form>
                </div>
                <iframe
                    className="w-full h-[500px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2471.199473006839!2d19.455891076920338!3d51.72938679446195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a353fb21a7441%3A0xec17529491417c06!2sIgnacego%20Paderewskiego%206%2C%2093-509%20%C5%81%C3%B3d%C5%BA!5e0!3m2!1spl!2spl!4v1761582054251!5m2!1spl!2spl"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    )
}

export default Contact;