import { motion } from "motion/react";
import Navbar from "../components/Navbar"
import { MdOutlineAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import FormParking from "../components/FormParking";
import axios from "axios";


interface Parking{
    type: string;
    totalPlaces: number;
    placesOccupee: number
}

function Parking() {
    const [isopemform, setIsopemform] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<String | null>(null);
    const [Parking, setParking] = useState([])

    const API_URL = 'https://parking-system-b0eo.onrender.com/api/parking/GetParking';
    
    const fetchVehicule = async ()=> {
        try {
            setLoading(true);
            setError(null);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000)
            const reponse = await axios.get(API_URL);
            setParking(reponse.data);
            clearTimeout(timeout);
        } catch (error) {
            setError("Impossible de charger les blogs. Vérifiez votre connexion.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchVehicule();
    },[]);
    return (
        <section>
            < Navbar />
            <div className="p-2 mt-3">
                <div className="">
                    <h1 className="font-semibold text-2xl"> Configuration du parking</h1>
                </div>

                <div className="flex justify-end max-sm:grid max-sm:gap-4">

                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsopemform(true)}
                            className="px-4 py-2 rounded-lg bg-emerald-600 text-white cursor-pointer flex items-center gap-1" 
                            type="button"
                        >
                            < MdOutlineAdd size={25} />
                            Ajouter
                        </button>
                    </div>
                </div>

                {/* table recruitment */}
                <div className="flex flex-col mt-2.5">
                    <div className="-m-1.5 overflow-x-auto overflow-visible">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border border-gray-200 rounded-lg   overflow-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-slate-50">
                                    <tr className="">
                                        <th scope="col" className="px-6 py-3 text-center text-base font-medium max-sm:px-2 ">Type </th>
                                        <th scope="col" className="px-6 py-3 text-center text-base font-medium max-sm:hidden  ">Nombre Total de Place</th>
                                        <th scope="col" className="px-6 py-3 text-center text-base font-medium max-lg:hidden">Place occuper</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 text-xl">
                                        {Loading ? (
                                            <tr>
                                                <td colSpan={3} className="text-center py-10 text-red-400">
                                                    <div className="flex flex-col items-center gap-4">
                                                        {/* Spinner */}
                                                        <div className=" size-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                        <p className="text-gray-700 font-medium">Chargement des Parking...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : Error ? (
                                            <tr>
                                                <td colSpan={3} className="text-center py-10 text-red-400">
                                                    <p className="text-red-600 text-center font-medium">{Error}</p>
                                                    <button
                                                        onClick={() => window.location.reload()}
                                                        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-md hover:bg-red-600"
                                                    >
                                                        Réessayer
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : Parking.length > 0 ? (
                                            Parking.map((P: any, index)=> (
                                                <motion.tr 
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }} // Effet en cascade
                                                >
                                                    <td className="px-6 py-2 text-center  whitespace-nowrap text-base font-medium text-gray-800 max-sm:px-2"> {P.type} </td>
                                                    <td className="px-6 py-2 text-center  whitespace-nowrap text-base font-medium text-gray-800 max-sm:hidden "> {P.totalPlaces} </td>
                                                    <td className="px-6 py-2 text-center  whitespace-nowrap text-base font-medium text-gray-800 max-lg:hidden"> {P.placesOccupees} </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-10 text-red-400">
                                                    Aucun Parking trouvé.
                                                </td>
                                            </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* les composents */}
            < FormParking 
                isOpen={isopemform} 
                onClose={()=> setIsopemform(false)} 
                onSuccess={()=> {
                    fetchVehicule();
                }}
            />
        </section>
    )
}

export default Parking
