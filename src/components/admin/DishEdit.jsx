import {toast, ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllDishes, createDish, putDish, deleteDish} from "../../api/dishAPI.js";
import Menu from "../Menu.jsx";
import {Ban} from "lucide-react"


function DishEdit() {
    const [soup, setSoup] = React.useState([]);
    const [mainDish, setMainDish] = React.useState([]);
    const [dessert, setDessert] = React.useState([]);
    const [drink, setDrink] = React.useState([]);
    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        price: 0.01,
        dishType: "SOUP"
    });
    const [editMode, setEditMode] = React.useState(false);

    useEffect(() => {
        getAllDishes()
            .then((response) => {
                setSoup(response.filter(dish => dish.dishType === "SOUP"))
                setMainDish(response.filter(dish => dish.dishType === "MAIN"))
                setDessert(response.filter(dish => dish.dishType === "DESSERT"))
                setDrink(response.filter(dish => dish.dishType === "DRINK"))
            })
            .catch((error) => {
                console.log(error)
            })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.name.length < 3 || formData.description.length < 10){
            toast.error("Uzupełnij dane!", {
                className: 'min-w-[450px]',
            });
            return;
        }
        try {
            const response = await createDish(formData);
            if(response.dishType === "SOUP") {
                setSoup(prevState => [...prevState, response]);
            }
            else if(response.dishType === "MAIN") {
                setMainDish(prevState => [...prevState, response]);
            }
            else if(response.dishType === "DESSERT") {
                setDessert(prevState => [...prevState, response]);
            }
            else {
                setDrink(prevState => [...prevState, response]);
            }
            toast.success("Dodano posiłek!", {
                className: 'min-w-[450px]',
            });
            setFormData({
                name: "",
                description: "",
                price: 0.01,
                dishType: "SOUP"
            })
        } catch (error) {
            console.log(error);
            toast.error("Błąd dodania posiłku!", {
                className: 'min-w-[450px]',
            });
        }
    }


    return (
        <div className="min-h-screen flex flex-col">
            <Menu/>
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className="relative w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl mb-20">
                        <h1 className="text-4xl font-semibold text-center mb-5">Edycja karty dań</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label>Nazwa:</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="text"
                                        name="name"
                                        placeholder="Nazwa dania"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Cena (zł):</label>
                                    <input
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        type="number"
                                        name="price"
                                        min="0.01"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Opis:</label>
                                    <textarea
                                        className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        rows={1}
                                        placeholder="Opis dania"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label>Typ dania:</label>
                                    <select value={formData.dishType}
                                            onChange={(e) => setFormData({...formData, dishType: e.target.value})}
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                    >
                                        <option value="SOUP">Zupa</option>
                                        <option value="MAIN">Danie główne</option>
                                        <option value="DESSERT">Deser</option>
                                        <option value="DRINK">Napój</option>
                                    </select>
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    {editMode && (
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Edytuj danie</button>
                                    )}
                                    {!editMode && (
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj danie</button>
                                    )}

                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        {(soup.length === 0 && mainDish.length === 0 && dessert.length === 0 && drink.length === 0) && (
                            <div className="flex flex-col items-center justify-center">
                                <Ban className="w-44 h-44 mb-10"/>
                                <h1 className="text-4xl font-semibold">Nie dodano żadnych dań do karty!</h1>
                            </div>
                        )}
                        {(soup.length > 0 || mainDish.length > 0 || dessert.length > 0 || drink.length > 0) && (
                            <div className="flex flex-col">
                                {soup.length > 0 && (
                                    <div>
                                        <h1 className="text-4xl font-semibold text-center">Zupy</h1>
                                        {soup
                                            .slice(0, 3)
                                            .map((dish, index) => (
                                            <div className="flex-col">
                                                <div className="flex justify-between">
                                                    <h3 className="text-2xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                                    <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                                                </div>
                                                <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                                    <p className="text-xl text-gray-600">{dish.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <p className="text-center">Wyświetlono pierwsze {soup.length < 3 ? soup.length : 3} z {soup.length} wyników.</p>
                                    </div>
                                )}
                                {mainDish.length > 0 && (
                                    <div className="mt-20">
                                        <h1 className="text-4xl font-semibold text-center">Dania główne</h1>
                                        {mainDish
                                            .slice(0, 3)
                                            .map((dish, index) => (
                                                <div className="flex-col">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-2xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                                        <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                                                    </div>
                                                    <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                                        <p className="text-xl text-gray-600">{dish.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        <p className="text-center">Wyświetlono pierwsze {mainDish.length < 3 ? mainDish.length : 3} z {mainDish.length} wyników.</p>
                                    </div>
                                )}
                                {dessert.length > 0 && (
                                    <div className="mt-20">
                                        <h1 className="text-4xl font-semibold text-center">Desery</h1>
                                        {dessert
                                            .slice(0, 3)
                                            .map((dish, index) => (
                                                <div className="flex-col">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-2xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                                        <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                                                    </div>
                                                    <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                                        <p className="text-xl text-gray-600">{dish.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        <p className="text-center">Wyświetlono pierwsze {dessert.length < 3 ? dessert.length : 3} z {dessert.length} wyników.</p>
                                    </div>
                                )}
                                {drink.length > 0 && (
                                    <div className="mt-20">
                                        <h1 className="text-4xl font-semibold text-center">Napoje</h1>
                                        {drink
                                            .slice(0, 3)
                                            .map((dish, index) => (
                                                <div className="flex-col">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-2xl font-semibold text-logotext">{index+1}. {dish.name}</h3>
                                                        <h3 className="text-2xl font-semibold text-logotexthover">{Number(dish.price).toFixed(2)} zł</h3>
                                                    </div>
                                                    <div className="border-b-1 pt-2 pb-4 mb-10 border-gray-600">
                                                        <p className="text-xl text-gray-600">{dish.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        <p className="text-center">Wyświetlono pierwsze {drink.length < 3 ? drink.length : 3} z {drink.length} wyników.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DishEdit;