import { NavLink } from "react-router-dom"
import { RxDashboard } from "react-icons/rx";
import { IoCarSportOutline } from "react-icons/io5";
import { useSidebar } from "../context/SidebarContext";
import { IoClose } from "react-icons/io5";


function SideBar() {
    const { isOpen, toggleSidebar } = useSidebar();
    const LinkMenu = [
        {"link": "Dashboard", "icone": <RxDashboard />, "path": "/Dashboard"},
        {"link": "Vehicule", "icone": <IoCarSportOutline />, "path": "/Vehicule"},
    ]
    return (
        <>
            <div className="lg:w-72 bg-gray-50  px-8 py-4 max-lg:hidden">
                <div className="">
                    <h1 className="text-center text-2xl font-semibold text-emerald-500">Parkin System</h1>
                </div>

                <div className="mt-20">
                    <div>
                        <h1 className="text-left text-xl font-semibold text-gray-500">Menu</h1>
                    </div>
                    <ul className="mt-5 space-y-4">
                        {LinkMenu.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({isActive})=>
                                        `flex items-center gap-2 text-xl  cursor-pointer ${
                                            isActive ? "text-emerald-600 font-medium text-xl" : "hover:text-emerald-600"
                                        }`
                                    }
                                >
                                    {item.icone}
                                    {item.link}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* nav pour md  */}
            {isOpen && (
                <div 
                    className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-lg z-50 transition-transform duration-500 ease-in-out ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="p-5">
                        <button 
                            type="button"
                            className="text-emerald-600"
                            onClick={toggleSidebar}
                        >
                            <IoClose size={35} />
                        </button>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <ul className="mt-5 space-y-4">
                            {LinkMenu.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        onClick={toggleSidebar}
                                        className={({isActive})=>
                                            `flex items-center gap-2 text-xl  cursor-pointer ${
                                                isActive ? "text-emerald-600 font-medium text-xl" : "hover:text-emerald-600"
                                            }`
                                        }
                                    >
                                        {item.icone}
                                        {item.link}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default SideBar
