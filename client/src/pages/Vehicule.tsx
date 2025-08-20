import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
// icone
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdOutlineAdd } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { GrView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
// composent
import Navbar from "../components/Navbar";
import FomAddClient from "../components/FormAddClient";
import ModalDelete from "../components/ModalDelete";

function Recrutement() {
    const [isForm, setIsform] = useState(false); // open from
    const [isModalDelete, setIsModalDelete] = useState(false); // open Modalelete
    const [SearchTerm, setSearchTerm] = useState(""); // Search item for recrutment
    const [openMenuId , setOpenMenuId ] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleOpenMenu = ()=> {
        setOpenMenuId(true);
    }

    // Fermer le menu en cliquant en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (    
        <>
            <section >
                <Navbar />
                <div className="p-2 mt-3">
                    <div>
                        <h1 className='text-3xl font-roboto'>Vehicule</h1>
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
                                Enregistrer un Vehicule
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
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:px-2 ">Type </th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:hidden  ">Proprietaire</th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-lg:hidden">email</th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:hidden ">Plaque</th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-lg:hidden">Payer</th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-lg:hidden">Montant</th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:px-2 ">Statut</th>
                                    <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:px-2 "> Action </th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, }} // Effet en cascade
                                    >
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:px-2">Voiture</td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:hidden ">Maurice Miema Bope</td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-lg:hidden"> mauricetest@gmail.com</td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:hidden"> #ABCDERFT</td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:hidden"> Nom</td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-lg:hidden">20000 fc</td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:px-2">
                                            <button type="button" className="px-3 py-1 rounded-xl bg-[#FFEFE7] cursor-pointer text-red-400">
                                                En cours
                                            </button>
                                        </td>
                                        <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 relative overflow-visible max-sm:text-end max-sm:px-2">
                                            <button
                                                type="button"
                                                onClick={handleOpenMenu}
                                                className="px-1 py-3 rounded-lg hover:bg-green-400/15 cursor-pointer text-green-500"
                                            >
                                                <TbDotsVertical size={20} />
                                            </button>

                                            {openMenuId && (
                                                <motion.div
                                                    ref={menuRef}
                                                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="absolute right-0 top-4 bg-white w-48 px-2 py-2 border border-gray-300 shadow-lg rounded-md z-10"
                                                >
                                                    <ul className="text-gray-800">
                                                        <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-md flex items-center gap-2 cursor-pointer">
                                                            <GrView size={20} className="text-gray-600" /> View Details
                                                        </li>
                                                        <li 
                                                            
                                                            className="px-4 py-2 hover:bg-gray-100 hover:rounded-md flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <CiEdit size={20} /> Marquer Sortie
                                                        </li>
                                                        <li
                                                            onClick={() => {
                                                                // OpenModalDelete();
                                                                setOpenMenuId(false);
                                                                setIsModalDelete(true)
                                                            }}
                                                            className="px-4 py-2 hover:bg-red-100 hover:rounded-md text-red-500 flex items-center gap-2 cursor-pointer"
                                                        >
                                                            <AiOutlineDelete size={20} /> Supprimer
                                                        </li>
                                                    </ul>
                                                </motion.div>
                                            )}

                                        </td>
                                    </motion.tr>
                                </tbody>

                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* compoent */}
            < FomAddClient isOpen={isForm} onClose={()=> setIsform(false)} />
            < ModalDelete isOPenModal={isModalDelete} onClose={()=> setIsModalDelete(false)}/>
        </>
    )
}

export default Recrutement
