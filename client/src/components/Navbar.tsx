import axios from "axios";
import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "../context/SidebarContext";

function Navbar() {
    const { toggleSidebar } = useSidebar();
    // const [User, setUser] = useState([]);

    // useEffect(()=> {
    //     const fecthUser = async ()=> {

    //         try {
                
    //             const res = await axios.get("https://parking-system-b0eo.onrender.com/api/auth/me",{
    //                 withCredentials: true 
    //             });
    //             console.log("info usser conect: ", res);
    //             setUser(res.data);
    //         } catch (error) {
    //             console.error("erreur", error);
    //         }
    //     }

    //     fecthUser();
    // }, []);
    return (
        <section 
            className="py-2 px-4 border-b-1 border-gray-300 flex justify-between items-center"
        >
            <div className="">
                <h1 
                    className="text-3xl font-semibold max-sm:text-xl"
                >
                    Welcom, Maurice 👋
                    {/* Dashboard */}
                </h1>
            </div>

            <div className="flex items-center gap-2 max-lg:hidden">
                <div>
                    <img 
                        src="./imgs/profil.jpeg" 
                        alt="" 
                        className="size-12"
                    />
                </div>
                
                <div className="">
                    <h1 className="font-bold">Maurice Miema</h1>
                    <p className="text-gray-600">admin</p>
                </div>

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
