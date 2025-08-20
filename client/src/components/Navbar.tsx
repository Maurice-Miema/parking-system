import axios from "axios";
import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebar } from "../context/SidebarContext";

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

    useEffect(()=> {
        const fecthUser = async ()=> {
            try {
                setLoading(true)
                setError(null)
                const res = await axios.get("https://parking-system-b0eo.onrender.com/api/auth/me",{
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
    return (
        <section 
            className="py-2 px-4 border-b-1 border-gray-300 flex justify-between items-center"
        >
            <div className="">
                <h1 
                    className="text-3xl font-semibold max-sm:text-xl"
                >
                    Welcome, Maurice 👋
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
