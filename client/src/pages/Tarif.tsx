import { MdOutlineAdd } from 'react-icons/md';
import { motion } from 'motion/react';
import FormTarif from '../components/FormTarif';
import { useEffect, useState } from 'react';
import api from '../services/Api';

function Tarif() {
    const [isOPenForm, setIsOpenForm] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<String | null>(null);
    const [Tarif, setTarif] = useState([])

    const API_URL = '/api/tarifs/GetTarif';
    
    const fetchTarif = async ()=> {
        try {
            setLoading(true);
            setError(null);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000)
            const reponse = await api.get(API_URL);
            setTarif(reponse.data);
            clearTimeout(timeout);
        } catch (error) {
            setError("Impossible de charger les Tarif. Vérifiez votre connexion.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchTarif();
    },[]);


    return (
        <section className='font-roboto'>
            <div className='p-2 mt-3'>
                <div className='px-4 py-2'>
                    <h1 className=" text-2xl"> Gestion des tarifs</h1>
                </div>

                <div className="flex justify-end max-sm:grid max-sm:gap-4">
                
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpenForm(true)}
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
                            <div className="border border-gray-200 rounded-lg  overflow-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-slate-50">
                                    <tr className="">
                                        <th scope="col" className="px-6 py-3 text-center text-base font-medium max-sm:px-2 ">Type </th>
                                        <th scope="col" className="px-6 py-3 text-center text-base font-medium   ">Prix par Heure</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 text-xl">
                                        {Loading ? (
                                            <tr>
                                                <td colSpan={2} className="text-center py-10 text-red-400">
                                                    <div className="flex flex-col items-center gap-4">
                                                        {/* Spinner */}
                                                        <div className=" size-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                                        <p className="text-gray-700 font-medium">Chargement des Tarif...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : Error ? (
                                            <tr>
                                                <td colSpan={3} className="text-center py-10 text-red-400">
                                                    <p className="text-red-600 text-center font-medium">{Error}</p>
                                                    <button
                                                        onClick={() => fetchTarif()}
                                                        className="px-4 py-2 bg-red-500 mt-4 cursor-pointer text-white rounded-md hover:bg-red-600"
                                                    >
                                                        Réessayer
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : Tarif.length > 0 ? (
                                            Tarif.map((T: any, index)=> (
                                                <motion.tr 
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }} // Effet en cascade
                                                >
                                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800 max-sm:px-2">{T.type}</td>
                                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800 "> {T.prixHeure} $ </td>
                                                </motion.tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-10 text-red-400">
                                                    Aucun Tarif trouvé.
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

            {/* le composent */}
            < FormTarif isOpen={isOPenForm} onClose={()=> setIsOpenForm(false)} onSuccess={()=> fetchTarif()}  />
        </section>
    )
}

export default Tarif
