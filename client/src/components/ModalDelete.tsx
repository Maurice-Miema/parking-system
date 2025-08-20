import { AnimatePresence, motion } from "motion/react"
import { FcHighPriority } from "react-icons/fc";

interface ModalProps {
    isOPenModal: boolean;
    onClose: ()=> void;
}

function ModalDelete({isOPenModal, onClose}: ModalProps) {
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
                            <h1 className="text-xl text-center py-4">Êtes-vous sûr de vouloir supprimer ce Vehicule ?</h1>
                            <p className="text-center text-gray-400">
                                La suppression de ce  Vehicule est permanente et irréversible. Une fois supprimée, 
                                il ne pourra pas être récupérée.
                            </p>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="border border-gray-400 font-medium cursor-pointer rounded-lg py-2 w-full"
                            >
                                Cancel
                            </button>

                            <button 
                                type="button"
                                className="bg-red-500 cursor-pointer font-medium text-white rounded-lg py-2 w-full"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default ModalDelete
