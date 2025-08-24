import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";
import { FcHighPriority } from "react-icons/fc";
import api from "../services/Api";

interface ModalProps {
    isOPenModal: boolean;
    onClose: ()=> void;
    onDeleted?: () => void; 
    user: any| null;
}

function ModalDeleteUser({isOPenModal, onClose, user, onDeleted}: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!user?._id) return;
        setLoading(true);
        setError(null);
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const url = `/api/auth/deleteUser/${user._id}`;
            await api.delete(url, { signal: controller.signal });
            clearTimeout(timeout);
            if (onDeleted) onDeleted();
            onClose();
        } catch (err: any) {
            if (err.name === "CanceledError") {
                setError("La requête a pris trop de temps. Vérifiez votre connexion.");
            } else {
                setError("Échec de la suppression. Veuillez réessayer.");
            }
            console.error("Erreur lors de la suppression :", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);  
        setLoading(false);
        onClose();
    };
    return (
        <AnimatePresence>
            {isOPenModal && (
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    className='absolute inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center h-screen max-sm:px-4'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white px-4 py-2 rounded-lg"
                    >
                        <div>
                        <div className="flex justify-center">
                            < FcHighPriority size={70} />
                        </div>
                        
                        <div className="md:w-96 md:block">
                            <h1 className="text-xl text-center py-4">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h1>
                            <p className="text-center text-emerald-500 text-xl pb-2">{user.nom} {user.postnom} {user.prenom} </p>
                            <p className="text-center text-gray-400">
                                La suppression de cet utilisateur est permanente et irréversible. Une fois supprimée, 
                                il ne pourra pas être récupérée.
                            </p>
                            
                        </div>
                        
                        {error && (
                            <p className="text-red-500 text-center mt-2">{error}</p>
                        )}

                        <div className="flex gap-2 mt-4">
                            <button 
                                type="button"
                                onClick={handleClose}
                                className="border border-gray-400 font-medium cursor-pointer rounded-lg py-2 w-full"
                            >
                                Cancel
                            </button>

                            <button 
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="bg-red-500 cursor-pointer font-medium text-white rounded-lg py-2 w-full"
                            >
                                {loading ? "Suppression..." : "Supprimer"}
                            </button>
                        </div>
                    </div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default ModalDeleteUser


