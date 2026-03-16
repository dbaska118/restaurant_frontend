import Menu from "./Menu.jsx";
import MainPage from "./MainPage.jsx";
import React, {useEffect} from "react";
import {getAllDishes} from "../api/dishAPI.js";


function DishMenu() {
    const [soup, setSoup] = React.useState([]);
    const [mainDish, setMainDish] = React.useState([]);
    const [dessert, setDessert] = React.useState([]);
    const [drink, setDrink] = React.useState([]);
    const soupRef = React.useRef(null);
    const drinkRef = React.useRef(null);
    const mainDishRef = React.useRef(null);
    const dessertRef = React.useRef(null);

    useEffect(() => {
        getAllDishes()
            .then((response) => {
                console.log(response);
                setSoup(response.filter(dish => dish.dishType === "SOUP"))
                setMainDish(response.filter(dish => dish.dishType === "MAIN"))
                setDessert(response.filter(dish => dish.dishType === "DESSERT"))
                setDrink(response.filter(dish => dish.dishType === "DRINK"))
            })
            .catch((error) => {
                console.log(error)
            })
    },[])

    const scrollTo = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop - 120,
            behavior: "smooth",
        })
    }

    return (
        <div>
            <Menu/>
            <div className="mx-10 mt-56">
                <div className="flex gap-5 justify-center mb-16">
                    <button onClick={() => scrollTo(soupRef)}  className="border-2 p-4 shadow-xl border-logotext bg-amber-50 rounded-3xl w-1/4 text-3xl text-logotext font-serif hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">ZUPY</button>
                    <button onClick={() => scrollTo(mainDishRef)} className="border-2 p-4 shadow-xl border-logotext bg-amber-50 rounded-3xl w-1/4 text-3xl text-logotext  font-serif hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">DANIA GŁÓWNE</button>
                    <button onClick={() => scrollTo(dessertRef)} className="border-2 p-4 shadow-xl border-logotext bg-amber-50 rounded-3xl w-1/4 text-3xl text-logotext  font-serif hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">DESERY</button>
                    <button onClick={() => scrollTo(drinkRef)} className="border-2 p-4 shadow-xl border-logotext bg-amber-50 rounded-3xl w-1/4 text-3xl text-logotext  font-serif hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">NAPOJE</button>
                </div>
                <div ref={soupRef} className="h-[30vh] w-full bg-[url('/soup.jpg')] bg-fixed bg-center bg-cover relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h2 className="relative z-10 text-white text-8xl font-serif tracking-widest">
                        ZUPY
                    </h2>
                </div>
                <div className="flex flex-col items-center w-full mt-10 mb-20">
                    {soup.map((dish, index) => (
                        <div className="w-2/3 flex-col">
                            <div className="flex justify-between">
                                <h3 className="text-3xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                            </div>
                            <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                <p className="text-2xl text-gray-600">{dish.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={mainDishRef} className="h-[30vh] w-full bg-[url('/maindish.jpg')] bg-fixed bg-center bg-cover relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h2 className="relative z-10 text-white text-8xl font-serif tracking-widest">DANIA GŁÓWNE</h2>
                </div>
                <div className="flex flex-col items-center w-full mt-10 mb-20">
                    {mainDish.map((dish, index) => (
                        <div className="w-2/3 flex-col">
                            <div className="flex justify-between">
                                <h3 className="text-3xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                            </div>
                            <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                <p className="text-2xl text-gray-600">{dish.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={dessertRef} className="h-[30vh] w-full bg-[url('/dessert.jpg')] bg-fixed bg-center bg-cover relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h2 className="relative z-10 text-white text-8xl font-serif tracking-widest">DESERY</h2>
                </div>
                <div className="flex flex-col items-center w-full mt-10 mb-20">
                    {dessert.map((dish, index) => (
                        <div className="w-2/3 flex-col">
                            <div className="flex justify-between">
                                <h3 className="text-3xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                            </div>
                            <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                <p className="text-2xl text-gray-600">{dish.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={drinkRef} className="h-[30vh] w-full bg-[url('/drink.jpg')] bg-fixed bg-center bg-cover relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h2 className="relative z-10 text-white text-8xl font-serif tracking-widest">NAPOJE</h2>
                </div>
                <div className="flex flex-col items-center w-full mt-10 mb-20">
                    {drink.map((dish, index) => (
                        <div className="w-2/3 flex-col">
                            <div className="flex justify-between">
                                <h3 className="text-3xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                            </div>
                            <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                <p className="text-2xl text-gray-600">{dish.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DishMenu;