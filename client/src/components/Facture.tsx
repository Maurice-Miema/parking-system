import { AnimatePresence, motion } from "motion/react";
import api from "../services/Api";

interface PropsFac {
    Open: boolean;
    onClose: () => void;
    factureData: any | null;
    onPrinted: () => void;
}


function Facture({ Open, onClose, factureData, onPrinted }: PropsFac) {

    const handlePrint = async () => {
        try {
            // impression
            window.print();
            // appel API pour sauvegarder la facture
            await api.post("/api/facture/saveinvoices", factureData);
            onPrinted();
            onClose();
        } catch (err) {
            console.error("Erreur lors de l’envoi de la facture", err);
        }
    };

    if (!factureData) return null;
    return (
        <AnimatePresence>
            {Open && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center h-screen"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="grid gap-2"
                    >
                        <div className="bg-white w-md rounded-md p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-xl font-medium text-emerald-600">Maugus-Parking</h1>
                                </div>
                                <div>
                                    <h1 className="text-xl">Facture N° </h1>
                                </div>
                            </div>
        
                            <div className=" mt-4 ">
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                    <tbody className="">
                                        <tr className="border border-x-0 border-emerald-300 bg-emerald-50 ">
                                            <td className="py-2 px-4 font-medium "> Identite </td>
                                            <td className="py-2 px-4 text-center"> Information </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 font-medium ">Proprietaire :</td>
                                            <td className="py-2 px-4 text-center "> {factureData.vehicle.proprietaire.nom} {factureData.vehicle.proprietaire.postnom} {factureData.vehicle.proprietaire.prenom} </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 font-medium "> Email :</td>
                                            <td className="py-2 px-4 text-center "> {factureData.vehicle.proprietaire.email} </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 font-medium "> Type Vehicule :</td>
                                            <td className="py-2 px-4 text-center "> {factureData.vehicle.type} </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 font-medium "> Plaque :</td>
                                            <td className="py-2 px-4 text-center "> {factureData.vehicle.plaque} </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 font-medium "> Data Entree :</td>
                                            <td className="py-2 px-4 text-center "> {new Date(factureData.vehicle.dateEntree).toLocaleString()} </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 font-medium "> Data Sortie :</td>
                                            <td className="py-2 px-4 text-center "> {new Date(factureData.vehicle.dateSortie).toLocaleString()} </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-3 px-4 font-medium ">Total HT :</td>
                                            <td className="py-3 px-4 text-center "> {factureData.prix} $</td>
                                        </tr>
                                        <tr className=" border-b-2 border-emerald-300 ">
                                            <td className="py-3 px-4 font-bold ">Total TTC :</td>
                                            <td className="py-3 px-4 font-bold text-center text-green-600"> {factureData.prix} $</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
        
                                {/* Footer */}
                                <div className="mt-6 text-gray-500 text-sm text-right">
                                    Merci pour votre confiance !
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between rounded-md shadow-lg bg-white px-6 py-2 max-sm:px-2'>
                            <div>
                                <button 
                                    type="button"
                                    onClick={onClose}
                                    className="py-2 px-8 text-white rounded-md bg-red-400 cursor-pointer hover:bg-red-500"
                                >
                                    Annuler
                                </button>
                            </div>
                            
                            <div>
                                <button 
                                    type="button"
                                    onClick={handlePrint}
                                    className='bg-emerald-600 hover:bg-emerald-700 font-medium px-4 py-2 text-white rounded-md cursor-pointer'
                                >
                                    Imprimer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Facture
