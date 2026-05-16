import {getAllRestaurantTable} from "../../api/restaurantTableAPI.js";
import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {Ban, NotebookPen, Trash} from "lucide-react";

function RestaurantTableStatusEdit() {
    const [restaurantTable, setRestaurantTable] = React.useState([]);
    const [formData, setForm] = React.useState({
        id: undefined,
        version: undefined,
        status: ""
    })
    const [chairsGroup, setChairsGroup] = React.useState([]);
    const [filterStatus, setFilterStatus] = React.useState("all");
    const [filterChairs, setFilterChairs] = React.useState("all");
    const [filterName, setFilterName] = React.useState("");

    useEffect(() => {
        getAllRestaurantTable()
            .then((response) => {
                setRestaurantTable(response);
                const seatGroups = [...new Set(response.map(t => t.numberOfChairs))].sort((a, b) => a - b);
                setChairsGroup(seatGroups);
                console.log(seatGroups);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    const filteredTables = restaurantTable.filter(table => {
        const matchesStatus = filterStatus === "all" || table.status === filterStatus;
        const matchChairs = filterChairs === "all" || table.numberOfChairs >= Number(filterChairs);
        const matchName = table.name.toLowerCase().includes(filterName.toLowerCase());
        return matchesStatus && matchChairs && matchName;
    })

    return (
        <div className="min-h-screen flex flex-col">
            <ToastContainer position="top-center" className="text-xl" autoClose={3000} theme="light"/>
            <div className="relative w-full min-h-screen flex justify-center pt-52 pb-20">
                <div className="absolute inset-0 bg-repeat bg-[url('/utensils-crossed.svg')] z-0"></div>
                <div className=" w-3/4 z-10">
                    <div className="bg-white flex flex-col border-3  border-logotext rounded-xl py-6 px-12 text-2xl">
                        <h1 className="text-4xl font-semibold text-center mb-5">Zarządzanie obłożeniem stolików</h1>
                        {restaurantTable.length === 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <Ban className="w-44 h-44 mb-10"/>
                                <h1 className="text-4xl font-semibold">Nie dodano jeszcze żadnych stolików!</h1>
                            </div>
                        )}
                        {restaurantTable.length > 0 && (
                            <div>
                                <div className="grid grid-cols-3 gap-10 mt-4 text-center">
                                    <div className="flex flex-col mb-10">
                                        <label className="text-3xl mb-2">Status stolików</label>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover">
                                            <option value="all">Wszystkie</option>
                                            <option value="FREE">Wolne</option>
                                            <option value="OCCUPIED">Zajęte</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-3xl  mb-2">Nazwa stolika</label>
                                        <input
                                            value={filterName}
                                            onChange={(e) => setFilterName(e.target.value)}
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover"
                                            placeholder="Nazwa stolika"

                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-3xl  mb-2">Minimalna liczba miejsc</label>
                                        <select
                                            value={filterChairs}
                                            onChange={(e) => setFilterChairs(e.target.value)}
                                            className="border-2 border-logotext rounded-xl p-3 text-xl mt-1 mb-2 outline-none focus:border-logotexthover">
                                            <option value="all">Wszystkie</option>
                                            {chairsGroup.map(chairs => (
                                                    <option value={chairs}>{chairs}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                {filteredTables.length === 0 && (
                                    <div className="flex flex-col items-center justify-center">
                                        <Ban className="w-44 h-44 mb-10"/>
                                        <h1 className="text-4xl font-semibold">Nie znaleziono stolików dla wybranych filtrów!</h1>
                                    </div>
                                )}
                                {filteredTables.length > 0 && (
                                    <div>
                                        {chairsGroup.map(chairs => {
                                            const tableGroup = filteredTables.filter(t => t.numberOfChairs === chairs)
                                            if (tableGroup.length === 0) {
                                                return null;
                                            }

                                            const freeTables = tableGroup.filter(t => t.status === "FREE").length

                                            return (
                                                <div key={chairs} className="mb-20">
                                                    <h1 className="text-3xl font-semibold text-center mb-2">Miejsca: {chairs}</h1>
                                                    <h2 className="text-2xl font-semibold text-center text-gray-600">Wolne stoliki {freeTables}/{tableGroup.length}</h2>
                                                    {tableGroup
                                                        .sort((a, b) => {
                                                            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
                                                        })
                                                        .map(table => (
                                                            <div key={table.id} className="flex flex-col border-b-1 pt-2 pb-4 mb-8 border-gray-600">
                                                                <div className="flex justify-between ">
                                                                    <div className="grid grid-cols-2 gap-10">
                                                                        <h3 className="text-3xl font-semibold text-logotext">{table.name}</h3>
                                                                        <p className={`text-2xl ${table.status === "FREE" ? `text-green-600` : `text-red-600`} `}>{table.status === "FREE" ? "Wolny" : "Zajęty"}</p>
                                                                    </div>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => handleEdit(table)} className="cursor-pointer flex items-center gap-1 text-green-500 hover:text-green-700"> <NotebookPen /> Zmień stan</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            )
                                        })}
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

export default RestaurantTableStatusEdit