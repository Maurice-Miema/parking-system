import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

interface FromProps{
    isOpen: boolean;
    onClose: ()=> void;
    onSuccess?: ()=> void;
}

function FormParking( {isOpen, onClose, onSuccess}: FromProps) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        type: "",
        Nombredeplace: "",
    });

    // gestion de changement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: ""});
    }

    // 3. Validation
    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!formData.type) tempErrors.type = "Le type est obligatoire";
        if (!formData.Nombredeplace) tempErrors.Nombredeplace = "Le nombre de place est obligatoire";
        return tempErrors;
    };

     // 4. Soumission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        try {
        
            const DataSend = {
                type: formData.type,
                totalPlaces: formData.Nombredeplace
            }
            console.log("les data de form a sed :", DataSend);
            await axios.post("http://localhost:5000/api/parking/AddTarkingAndUpdate", DataSend);
            
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={ { duration: 0.25 }}
                    onClick={onClose}
                    className='absolute inset-0 bg-black/60 backdrop-blur-md flex justify-center cursor-pointer max-sm:px-4'
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -15}}
                            animate={{ opacity: 1, y: 15}}
                            exit={{ opacity: 0, y: 15}}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e)=> e.stopPropagation()}
                            className="bg-white w-lg rounded-md px-4 py-2 mt-4"
                        >
                            <h1 className="text-2xl font-semibold text-center">Parking</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="mt-4 mb-4">
                                    <label className="block" htmlFor="type">Type</label>
                                    <select
                                        name="type"
                                        id="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full border border-gray-400  focus:outline-gray-400 rounded-lg py-2 px-4 "
                                    >
                                        <option value="">Choisissez le type</option>
                                        <option value="voiture">voiture</option>
                                        <option value="camion" >camion</option>
                                        <option value="bus">bus</option>
                                        <option value="moto">moto</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="Nombredeplace" className="block">Nombre de Places</label>
                                    <input 
                                        id="number"
                                        name="Nombredeplace"
                                        type="number"
                                        value={formData.Nombredeplace}
                                        onChange={handleChange}
                                        placeholder="Veuillez saisir lee nombre de places"
                                        className="w-full border border-gray-400 focus:outline-emerald-400 rounded-lg py-2 px-4" 
                                    />
                                    {errors.Nombredeplace && <p className="text-red-500 text-sm">{errors.Nombredeplace}</p>}
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button 
                                        type="submit"
                                        className="px-8 py-2 bg-emerald-500 rounded-md text-white cursor-pointer"
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            </form>

                        </motion.div>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default FormParking
