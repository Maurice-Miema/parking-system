import { FaEnvelope } from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

interface LoginForm {
    email: string;
    password: string
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<String | null>(null);
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: ""
    });

    // pour le changement dans un input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setForm({ ...form, [e.target.id]: e.target.value})
    }

    // pour la soumision du form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const controler = new AbortController();
            const timeout = setTimeout(() => controler.abort(), 30000); // pour 30 sec
            await api.post("/api/auth/login", form);
            clearTimeout(timeout);
            navigate("/Dashboard");
        } catch (err: any) {
            if (err.name === "CanceledError") {
                setError("La requête a pris trop de temps. Vérifiez votre connexion.");
            } else {
                setError("Mot de passe ou email incorrect.");
            }
            // setError("Erreur Survenu, Vérifiez votre connexion. ");
            console.error("Erreur lors de l envoie :", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <section className="px-4 md:px-0 font-roboto h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white rounded-xl md:w-lg w-md md:px-14 px-4 py-8">
                <h1 className="text-center text-2xl pb-4">Authentification</h1>
                <h1 className="text-center text-4xl font-semibold text-emerald-500"> Parking System</h1>
                <h2 className="text-center font-medium py-1">
                    Identifiez-vous pour continuer.
                </h2>

                {error && ( 
                    <p className="text-center text-red-500 py-2 font-semibold"> {error} </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <div className="relative">
                            <FaEnvelope 
                                size={25} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl" 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={handleChange}
                                placeholder="Entrez votre email"
                                className="w-full py-2 px-10 rounded-md border focus:outline-green-600"
                                required
                            />

                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2" htmlFor="password">Mot de Passe</label>
                        <div className="relative">
                            <GoPasskeyFill 
                                size={25} 
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl" 
                            />
                            {showPassword ? (
                                <FaEye 
                                    size={25} 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" 
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <FaEyeSlash 
                                    size={25} 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" 
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                id="password"
                                onChange={handleChange}
                                placeholder="Entrez votre Mot de passe"
                                className="w-full py-2 px-10 rounded-md border focus:outline-green-600"
                                required
                            />

                            
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="button"
                            className="text-emerald-700"
                        >
                            Mot de Passe Oublier ?
                        </button>
                    </div>

                    <div className="mt-5">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 text-white rounded-md text-xl cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                        >
                            {loading ? "Connexion en cours ....": "Se Connecter"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;
