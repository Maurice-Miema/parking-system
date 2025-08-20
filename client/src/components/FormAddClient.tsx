import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface PropsForm {
    isOpen: boolean;
    onClose: ()=> void;
    onSuccess?: () => void;
}

function FomAddVehicule( {isOpen, onClose, onSuccess}: PropsForm) {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nom: "",
        postnom: "",
        prenom: "",
        email: "",
        plaque: "",
        type: "",
    });


    // Gestion du changement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    // 3. Validation
    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!formData.nom) tempErrors.nom = "Le nom est obligatoire";
        if (!formData.postnom) tempErrors.postnom = "Le postnom est obligatoire";
        if (!formData.prenom) tempErrors.prenom = "Le prénom est obligatoire";
        if (!formData.email) tempErrors.email = "L'email est obligatoire";
        if (!formData.plaque) tempErrors.plaque = "La plaque est obligatoire";
        if (!formData.type) tempErrors.type = "Le type est obligatoire";
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
            setLoading(false);
            setError(null);
            
            const DataSend = {
                type: formData.type,
                plaque: formData.plaque,
                proprietaire: {
                    nom: formData.nom,
                    postnom: formData.postnom,
                    prenom: formData.prenom,
                    email: formData.email
                },
            }
            console.log("les data de form a sed :", DataSend);
            const controller = new AbortController();
            const timeout = setTimeout(()=> controller.abort(), 15000);
            await axios.post("https://parking-system-b0eo.onrender.com/api/vehicle/entreeVehicule", DataSend, {
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err: any) {
            if(err.name === "CanceledError"){
                setError("La requête a pris trop de temps. Vérifiez votre connexion.");
            } else {
                setError("Imposible d'enregistrer une erreur est survenue")
            }
            console.error("Erreur lors de l'envoi :", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    className='absolute inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center h-screen md:px-0 px-4'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-md px-4 py-3 w-lg"
                    >
                        <h1 className="text-center text-2xl font-medium">Ajouter un Vehicule </h1>

                        <form onSubmit={handleSubmit} className="mt-4">

                            <div className="grid gap-2 md:grid-cols-2">
                                <div className="mb-2">
                                    <label htmlFor="nom" className="block text-md">Nom</label>
                                    <input 
                                        id="nom"
                                        name="nom"
                                        type="text" 
                                        value={formData.nom}
                                        onChange={handleChange}
                                        placeholder="Veuillez saisir le nom du client"
                                        className="w-full border border-gray-400 focus:outline-emerald-400 rounded-lg py-2 px-4" 
                                    />
                                    {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="postnom" className="block text-md">Potnom</label>
                                    <input 
                                        id="postnom"
                                        name="postnom"
                                        type="text"
                                        value={formData.postnom}
                                        onChange={handleChange}
                                        placeholder="Veuillez saisir le Postnom du client"
                                        className="w-full border border-gray-400 focus:outline-emerald-400 rounded-lg py-2 px-4" 
                                    />
                                    {errors.postnom && <p className="text-red-500 text-sm">{errors.postnom}</p>}
                                </div>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="prenom" className="block text-md">Prenom</label>
                                <input 
                                    id="prenom"
                                    name="prenom"
                                    type="text"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    placeholder="Veuillez saisir le prénom du client"
                                    className="w-full border border-gray-400 focus:outline-emerald-400 rounded-lg py-2 px-4" 
                                />
                                {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
                            </div>

                            <div className="mb-2">
                                <label htmlFor="email" className="block text-md">Email</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Veuillez saisir l'adresse email du client"
                                    className="w-full border border-gray-400 focus:outline-emerald-400 rounded-lg py-2 px-4" 
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="mb-2">
                                <label htmlFor="plaque" className="block text-md">Plaque</label>
                                <input 
                                    id="plaque"
                                    name="plaque"
                                    type="text"
                                    value={formData.plaque}
                                    onChange={handleChange}
                                    placeholder="Veuillez saisir la plaque du véhicule"
                                    className="w-full border border-gray-400 focus:outline-emerald-400 rounded-lg py-2 px-4" 
                                />
                                {errors.plaque && <p className="text-red-500 text-sm">{errors.plaque}</p>}
                            </div>

                            <div className="mt-4 mb-2">
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

                            {Error && (
                                <p className="text-center text-red-400">{Error}</p>
                            )}

                            <div className="flex justify-between mt-10">
                                <div>
                                    <button 
                                        type="button"
                                        onClick={onClose}
                                        className="py-2 px-8 text-white rounded-md bg-red-400 cursor-pointer"
                                    >
                                        Annuler
                                    </button>
                                </div>

                                <div>
                                    <button 
                                        type="submit"
                                        disabled={Loading}
                                        className="py-2 px-8 rounded-md bg-emerald-600 text-white cursor-pointer"
                                    >
                                        {Loading ? "En cours.." : "Enregistrer"}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default FomAddVehicule
