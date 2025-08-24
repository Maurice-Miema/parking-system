import { motion } from "motion/react";
import { useEffect, useState } from "react";
// icone
import { CiSearch } from "react-icons/ci";
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
// composent
import FormUser from "../components/FormUser";
import ModalDeleteUser from "../components/ModalDeleteUser";
import api from "../services/Api";

function Recrutement() {
    const [isForm, setIsform] = useState(false); // open from
    const [isModalDelete, setIsModalDelete] = useState(false); // open Modalelete
    const [SearchTerm, setSearchTerm] = useState(""); // Search item for User
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<string | null>(null);
    const [User, setUser] = useState([]);
    const [SelectedUser, setSelectedUser] = useState<any | null>(null)

    // Fermer le menu en cliquant en dehors
    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
    //         }
    //     }
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    const fetchUser = async ()=> {
        try {
            setLoading(true);
            setError(null);
            
            const url ='/api/auth/getUsers';
            const reponse = await api.get(url);
            console.log("la data user: ", reponse);
            setUser(reponse.data);
        } catch (error) {
            setError("Impossible de charger les blogs. Vérifiez votre connexion.");
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    // const handler = setTimeout(() => {
    //     setDebouncedSearch(SearchTerm);
    // }, 500);
    
    // return () => clearTimeout(handler);
    // }, [SearchTerm]);

    useEffect(()=> {
        fetchUser();
    }, []);


    const OpenModalDelete = (user: any)=>{
        setSelectedUser(user);
        // setOpenMenuId(null);
        setIsModalDelete(true)
    }

    return (    
        <>
            <section className="font-roboto" >
                <div className="p-2 mt-3">
                    <div>
                        <h1 className='text-3xl'>Utilisateur</h1>
                    </div>

                    <div className="sm:flex items-center max-sm:grid max-sm:gap-4">
                        <div className="mt-1 sm:w-[50%]">
                            <div className='flex w-full'>
                                <input 
                                    type="search" 
                                    value={SearchTerm}
                                    onChange={(e)=> setSearchTerm(e.target.value)}
                                    placeholder='Search'
                                    className={`border-slate-300 border-2 md:border-r-0 py-1 w-full px-4 outline-none  focus:border-2 focus:border-r-0 
                                    focus:outline-none rounded-md md:rounded-l-md md:rounded-r-none  md:w-64 lg:w-80 "block" : "hidden md:block"}`}
                                />
                                <button 
                                    type="button"
                                    className=' py-2 px-2 md:border-2 md:border-slate-300 md:border-l-0 md:rounded-r-md'
                                >
                                    < CiSearch />
                                </button>
                                    
                            </div>
                        </div>

                        <div className="sm:w-[50%] flex sm:justify-end">
                            <button
                                onClick={() => setIsform(true)}
                                className="px-4 py-2 rounded-lg bg-emerald-600 text-white cursor-pointer flex items-center gap-1" 
                                type="button"
                            >
                                < MdOutlineAdd size={25} />
                                Ajouter un Utilisateur
                            </button>
                        </div>
                    </div>

                    {/* table recruitment */}
                    <div className="flex flex-col mt-2.5">
                        <div className="-m-1.5 overflow-x-auto overflow-visible">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border border-gray-200 rounded-lg h-[70vh] overflow-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-slate-50">
                                    <tr className="">
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium  ">Identite</th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-lg:hidden">Email</th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-lg:hidden">Fonction</th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium ">Role</th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:px-2 "> Action </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {Loading ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-10 text-red-400">
                                                <div className="flex flex-col items-center gap-4 mt-10">
                                                    {/* Spinner */}
                                                    <div className=" size-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                                    <p className="text-gray-700 font-medium">Chargement des Users...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : Error ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-10 text-red-400">
                                                <p className="text-red-600 text-center font-medium">{Error}</p>
                                                <button
                                                    onClick={()=> fetchUser()}
                                                    className="px-4 py-2 mt-5 bg-red-500 cursor-pointer text-white rounded-md hover:bg-red-600"
                                                >
                                                    Réessayer
                                                </button>
                                            </td>
                                        </tr>
                                    ) : User.length > 0 ? (
                                        User.map((user: any, index)=> (
                                            <motion.tr 
                                                key={user._id || index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }} // Effet en cascade
                                            >
                                                <td className="px-6 py-1 whitespace-nowrap text-sm  text-gray-800  ">{user.nom} {user.postnom} {user.prenom}</td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-800 max-lg:hidden"> {user.email}</td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-800 "> {user.fonction}</td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-800 max-sm:hidden"> {user.role}</td>
                                                <td className="px-6 py-1 whitespace-nowrap flex justify-center text-sm  text-gray-800 overflow-visible max-sm:text-end max-sm:px-2">
                                                    <button
                                                        id={`button-${user._id}`}
                                                        type="button"
                                                        onClick={()=> OpenModalDelete(user)}
                                                        className="px-4 py-2 hover:bg-red-100 hover:rounded-md text-red-500 flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <AiOutlineDelete size={20} /> Supprimer
                                                    </button>

                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="text-center py-10 text-red-400">
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
            </section>

            {/* compoent */}
            < FormUser isOpen={isForm} onClose={()=> setIsform(false)} onSuccess={()=> fetchUser()} />
            < ModalDeleteUser 
                isOPenModal={isModalDelete} 
                onClose={()=> setIsModalDelete(false)} 
                user={SelectedUser}
                onDeleted={() => {
                    setUser((prevBlogs) => prevBlogs.filter((b: any) => b._id !== SelectedUser._id));
                }}
            />
        </>
    )
}

export default Recrutement
