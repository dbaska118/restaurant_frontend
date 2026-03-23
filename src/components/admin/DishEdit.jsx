import {toast, ToastContainer} from "react-toastify";
import React, {useEffect} from "react";
import {getAllDishes, createDish, putDish, deleteDish} from "../../api/dishAPI.js";
import Menu from "../Menu.jsx";
import {Ban, SearchCheck, NotebookPen, Trash} from "lucide-react"

const DishSelection = ({dishes, title, search, handleDelete, handleEdit}) => {
    const filetered = dishes.filter(dish =>
        dish.name.toLowerCase().includes(search.toLowerCase())
        || dish.description.toLowerCase().includes(search.toLowerCase())
    );

    if(filetered.length === 0){
        return null;
    }

    let showDishes;
    if(search === ""){
        showDishes = [...filetered].reverse().slice(0, 3);
    } else {
        showDishes = [...filetered].reverse();
    }

    return (
        <div className="mt-16">
            <h1 className="text-4xl font-semibold text-center mb-5">{title}</h1>
            {showDishes.map((dish) =>(
                <div key={dish.id} className="flex-col">
                    <div className="flex justify-between ">
                        <h3 className="text-2xl font-semibold text-logotext">{dish.name} - {Number(dish.price).toFixed(2)} zł</h3>
                        <div className="flex gap-4">
                            <button onClick={() => handleEdit(dish)} className="cursor-pointer flex items-center gap-1 text-green-500 hover:text-green-700"> <NotebookPen /> Edytuj</button>
                            <button onClick={() => handleDelete(dish)} className="cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-700"> <Trash/> Usuń</button>
                        </div>
                    </div>
                    <div className="border-b-1 pt-2 pb-4 mb-8 border-gray-600">
                        <p className="text-xl text-gray-600">{dish.description}</p>
                    </div>
                </div>
            ))}
            { search === "" ?
                <p className="text-center">Wyświetlono pierwsze {showDishes.length < 3 ? showDishes.length : 3} z {filetered.length} wyników.</p>
                :  <p className="text-center">Znaleziono {filetered.length} pasujących dań.</p>
            }
        </div>
    )
}




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
    const [search, setSearch] = React.useState("");

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

    const handleDelete = async (dish) => {
        try {
            const response = await deleteDish(dish.id);
            toast.success(`Usunięto danie: ${response.name}!`, {
                className: 'min-w-[450px]',
            });
            if(response.dishType === "SOUP"){
                setSoup(prevState => prevState.filter(dish => dish.id !== response.id));
            }
            else if(response.dishType === "MAIN"){
                setMainDish(prevState => prevState.filter(dish => dish.id !== response.id));
            }
            else if(response.dishType === "DESSERT"){
                setDessert(prevState => prevState.filter(dish => dish.id !== response.id));
            }
            else {
                setDrink(prevState => prevState.filter(dish => dish.id !== response.id));
            }
        } catch (error) {
            console.log(error)
            toast.error("Błąd usunięcia dania!", {
                className: 'min-w-[450px]',
            });
        }
    }

    const handleEdit = (dish) => {
        setEditMode(true);
        setFormData(dish)
        window.scroll(0, 0)
    }

    const cancelEdit = () => {
        setEditMode(false);
        setFormData({
            name: "",
            description: "",
            price: 0.01,
            dishType: "SOUP"
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.name.length < 3 || formData.description.length < 10){
            toast.error("Uzupełnij dane!", {
                className: 'min-w-[450px]',
            });
            return;
        }
        if(editMode) {
            try {
                const response = await putDish(formData.id, formData);
                if(response.dishType === "SOUP") {
                    setSoup(prevState => prevState.filter(dish => dish.id !== response.id));
                    setSoup(prevState => [...prevState, response]);
                }
                else if(response.dishType === "MAIN") {
                    setMainDish(prevState => prevState.filter(dish => dish.id !== response.id));
                    setMainDish(prevState => [...prevState, response]);
                }
                else if(response.dishType === "DESSERT") {
                    setDessert(prevState => prevState.filter(dish => dish.id !== response.id));
                    setDessert(prevState => [...prevState, response]);
                }
                else {
                    setDrink(prevState => prevState.filter(dish => dish.id !== response.id));
                    setDrink(prevState => [...prevState, response]);
                }
                toast.success(`Edytowano posiłek: ${response.name}!`, {
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
                toast.error("Błąd edycji posiłku!", {
                    className: 'min-w-[450px]',
                });
            }
        }
        else {
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
                toast.success(`Dodano posiłek: ${response.name}!`, {
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
                                        <div className="flex gap-10 w-full">
                                            <button type="submit"  className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Edytuj danie</button>
                                            <button type="button" onClick={() => cancelEdit()} className="w-full border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Anuluj edycję</button>
                                        </div>
                                    )}
                                    {!editMode && (
                                        <button type="submit"  className="w-1/2 border-2 p-3 border-logotext bg-amber-50 rounded-xl text-2xl text-logotext  hover:text-logotexthover hover:cursor-pointer hover:border-logotexthover">Dodaj danie</button>
                                    )}

                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        <div className="flex justify-center items-center gap-4 mt-5 mb-10" >
                            <SearchCheck className="w-12 h-12"/>
                            <input
                                className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover w-full"
                                type="text"
                                name="search"
                                placeholder="Wyfiltruj dania po nazwie lub opisie"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {(soup.length === 0 && mainDish.length === 0 && dessert.length === 0 && drink.length === 0) && (
                            <div className="flex flex-col items-center justify-center">
                                <Ban className="w-44 h-44 mb-10"/>
                                <h1 className="text-4xl font-semibold">Nie dodano żadnych dań do karty!</h1>
                            </div>
                        )}
                        {(soup.length > 0 || mainDish.length > 0 || dessert.length > 0 || drink.length > 0) && (
                            <div className="flex flex-col">
                                <DishSelection
                                    title="Zupy"
                                    dishes={soup}
                                    search={search}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                                <DishSelection
                                    title="Dania główne"
                                    dishes={mainDish}
                                    search={search}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                                <DishSelection
                                    title="Desery"
                                    dishes={dessert}
                                    search={search}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                                <DishSelection
                                    title="Napoje"
                                    dishes={drink}
                                    search={search}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DishEdit;