import axios from "axios";

// Créer une instance axios avec configuration globale
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erreur API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
