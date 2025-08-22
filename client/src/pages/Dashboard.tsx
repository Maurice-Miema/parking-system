import { useEffect, useState } from 'react';
import api from '../services/Api';
import { easeInOut, motion } from "framer-motion";
import EngagementOverview from "../components/Graphdash";
import Overview from "../components/ChartVehicule";

function Dashboard() {
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<String | null>(null);
    const [dasboard, setDasboard] = useState<any | []>([])

    const API_URL = '/api/vehicle/getStats';
    
    const fetchVehicule = async ()=> {
        try {
            setLoading(true);
            setError(null);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000)
            const reponse = await api.get(API_URL);
            // console.log("data dashboard:", reponse);
            setDasboard(reponse.data);
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
    
    // Définition des variantes d'animations
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // délai entre chaque bloc
            }
        }
    };

    // const item = {
    //     hidden: { opacity: 0, y: 30 },
    //     show: { 
    //         opacity: 1, 
    //         y: 0,
    //         transition: { 
    //             duration: 0.6 ,
    //             ease: easeInOut,
    //         }  
    //     }
    // };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,y: 0,
            transition: {
                delay: 0.2 * i,
                duration: 0.4,
                ease: easeInOut,
            }
        }),
    };

    return (
        <section>
            <div className='px-4 py-2 font-roboto'>
                <div className="">
                    <h1 className=" text-2xl"> Dashboard </h1>
                </div>

                {/* Grid animée */}
                <motion.div 
                    className='grid sm:grid-cols-3 mt-2 gap-2 mb-4'
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        custom={1} 
                        className='px-4 py-2 bg-emerald-500/85 rounded-md'
                    >
                        <h1>Nombre Total des Vehicules</h1>
                        <div className='flex py-4 justify-center'>
                            {Loading ? (
                                <div className="size-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : Error ? (
                                <h1 className='text-center text-red-500'> Erreur</h1>
                            ) : (
                                <h1 className='text-5xl font-semibold'> {dasboard.total} </h1>
                            )}
                        </div>
                        <h1>maugus-parking</h1>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        custom={2} 
                        className='px-4 py-2 bg-black text-white rounded-md'
                    >
                        <h1>Vehicules Stationner</h1>
                        <div className='flex py-4 justify-center'>
                            {Loading ? (
                                <div className="size-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : Error ? (
                                <h1 className='text-center text-red-500'> Erreur</h1>
                            ) : (
                                <h1 className='text-5xl font-semibold'> {dasboard.enCours} </h1>
                            )}
                        </div>
                        <h1>maugus-parking</h1>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        custom={3}
                        className='px-4 py-2 bg-[#a8a29e] text-white rounded-md'
                    >
                        <h1>Vehicules Sortie</h1>
                        <div className='flex py-4 justify-center'>
                            {Loading ? (
                                <div className="size-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : Error ? (
                                <h1 className='text-center text-red-500'> Erreur</h1>
                            ) : (
                                <h1 className='text-5xl font-semibold'> {dasboard.sortie} </h1>
                            )}
                        </div>
                        <h1>maugus-parking</h1>
                    </motion.div>
                </motion.div>

                <div className="sm:grid-cols-2 grid gap-2 ">
                    <motion.div
                        className="bg-white rounded-xl p-4 sm:h-[56vh] h-[60vh] overflow-auto "
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        custom={4}
                    >
                        <div className='pb-2'>
                            <h1 className='font-semibold'>Voiture, Bus, Camion, Moto Overview</h1>
                        </div>

                        {/* facebook et linkedIn */}
                        < Overview />
                    </motion.div>
                
                    <motion.div
                        className="bg-white rounded-xl p-4 sm:h-[56vh] h-[60vh] overflow-auto sm:mb-0 mb-3"
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        custom={5}
                    >
                        <div className='pb-2'>
                            <h1 className='font-semibold'>Engagement Overview</h1>
                        </div>
                        < EngagementOverview /> 
                    </motion.div>

                    
                </div>
            </div>
        </section>
    )
}

export default Dashboard;




                