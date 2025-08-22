import { useEffect, useRef, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "../context/SidebarContext";
import api from "../services/Api";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineChevronDown } from "react-icons/hi";

interface UserType {
    nom: string;
    postnom: string;
    email?: string;
}

function Navbar() {
    const { toggleSidebar } = useSidebar();
    const [User, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<String | null>(null)
    const [Ismenu, setIsmenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); 

    useEffect(()=> {
        const fecthUser = async ()=> {
            try {
                setLoading(true)
                setError(null)
                const res = await api.get("/api/auth/me",{
                    withCredentials: true 
                });
                // console.log("info usser conect: ", res);
                setUser(res.data);
            } catch (error) {
                console.error("erreur", error);
                setError("Impossible");
            } finally {
                setLoading(false);
            }
        }
        fecthUser();
    }, []);

    useEffect(()=> {
        function handleClickOutSide(event: MouseEvent) {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setIsmenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutSide);

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        }
    }, []);
    return (
        <section 
            className="py-2 px-4 border-b-1 border-gray-300 flex justify-between items-center"
        >
            <div className="">
                <h1 
                    className="text-3xl font-semibold max-sm:text-xl"
                >
                    Welcome 👋
                    {/* Dashboard */}
                </h1>
            </div>

            <div className="flex items-center gap-2 max-lg:hidden">
                <div 
                    className='flex items-center gap-2 relative'
                >
                    <div className='cursor-pointer'>
                        <img 
                            src="/src/assets/imgs/profil.jpeg" 
                            alt="Picture user"
                            onClick={()=> setIsmenu(!Ismenu)}
                            className='size-7 md:h-11 md:w-11 rounded-full lg:h-14 lg:w-14'
                        />
                    </div>
                    <div 
                        onClick={()=> setIsmenu(!Ismenu)}
                        className='flex items-center gap-2 cursor-pointer'
                    >
                        {loading ? (
                            <div>
                                <p>chargement ..</p>
                            </div>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : User ? (
                            <div >
                                <h1> {User.nom} {User.postnom} </h1>
                            </div>
                        ) : (
                            <p className="text-gray-500">Non connecté</p>
                        )}
                        <HiOutlineChevronDown size={20} />
                    </div>

                    {/* Modal Logout */}
                    < AnimatePresence > 
                        {Ismenu && (
                            <motion.div 
                                ref={menuRef}
                                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className='absolute top-16 right-1 border border-gray-300 bg-white shadow z-10 px-4 py-2 rounded-md w-60'
                            >
                                <div className='mb-2'>
                                    <div className='flex justify-center'>
                                        <img 
                                            src="/src/assets/imgs/profil.jpeg" 
                                            alt="Picture user" 
                                            className='h-9 w-9 md:h-11 md:w-11 rounded-full lg:h-20 lg:w-20'
                                        />
                                    </div>

                                    <div className='flex justify-center text-center'>
                                        {loading ? (
                                            <div>
                                                <p>chargement ..</p>
                                            </div>
                                        ) : error ? (
                                            <p className="text-red-400">{error}</p>
                                        ) : User ? (
                                            <div>
                                                <h1 className=""> {User.nom} {User.postnom} </h1>
                                                <p className="text-gray-600">admin</p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">Non connecté</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Link 
                                        to="/"
                                        type="button"
                                        className='flex items-center border border-gray-300 gap-2 py-1 rounded-md w-full justify-center cursor-pointer hover:bg-gray-50'
                                    >
                                        < IoIosLogOut size={30} />
                                        Se Déconnecter
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                </div>
                
                {/* <div className="">
                    {loading ? (
                        <div>
                            <p>chargement ..</p>
                        </div>
                    ) : error ? (
                        <p className="text-red-400">{error}</p>
                    ) : User ? (
                        <>
                            <h1 className="font-bold"> {User.nom} {User.postnom} </h1>
                            <p className="text-gray-600">admin</p>
                        </>
                    ) : (
                        <p className="text-gray-500">Non connecté</p>
                    )}
                </div> */}

            </div>

            {/* btn menu md */}
            <div className="lg:hidden">
                <button 
                    type="button"
                    onClick={toggleSidebar}
                >
                    <RiMenuLine size={35} />
                </button>
            </div>
        </section>
    )
}

export default Navbar
