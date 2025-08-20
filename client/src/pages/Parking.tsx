import { motion } from "motion/react";
import Navbar from "../components/Navbar"
import { MdOutlineAdd } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { useState } from "react";
import FormParking from "../components/FormParking";

function Parking() {
    const [isopemform, setIsopemform] = useState(false);
    return (
        <section>
            < Navbar />
            <div className="p-2 mt-3">
                <div className="">
                    <h1 className="font-semibold text-2xl"> Configuration du parking</h1>
                </div>

                <div className="flex justify-end max-sm:grid max-sm:gap-4">

                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsopemform(true)}
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
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:px-2 ">Type </th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:hidden  ">Nombre Total de Place</th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-lg:hidden">Place occuper</th>
                                        <th scope="col" className="px-6 py-3 text-start text-base font-medium max-sm:px-2 "> Action </th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 text-xl">
                                        <motion.tr 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, }} // Effet en cascade
                                        >
                                            <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:px-2">Voiture</td>
                                            <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-sm:hidden ">25 Places</td>
                                            <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 max-lg:hidden"> 20 Places</td>
                                            
                                            <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-800 relative overflow-visible max-sm:text-end max-sm:px-2">
                                                <button
                                                    type="button"
                                                    // onClick={handleOpenMenu}
                                                    className="px-1 py-3 rounded-lg hover:bg-green-400/15 cursor-pointer text-green-500"
                                                >
                                                    <TbDotsVertical size={20} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* les composents */}
            < FormParking isOpen={isopemform} onClose={()=> setIsopemform(false)} />
        </section>
    )
}

export default Parking
