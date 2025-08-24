import { useEffect, useState } from "react";
import { XAxis, ResponsiveContainer, YAxis, BarChart, Bar, Cell, CartesianGrid, Tooltip } from "recharts";
import api from "../services/Api";

const colors = ["#a8a29e", "#10b981", "#14b8a6", "#000000"];

function OverviewVehicule() {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState<String | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get("/api/vehicle/getStats"); 
            const apiData = response.data.parType; 
            // console.log("API DATA:", apiData);

            // transformer l'API en format recharts
            const mapped = apiData.map((item: any) => ({
                name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
                value: item.total,
            }));
            
            setData(mapped);
        } catch (err) {
            setError("Une erreur est survenue, Verifier votre connexion ou ressaiyer");
            console.error("Erreur API:", err);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full sm:h-[18rem] h-70 border border-gray-200 rounded-lg p-2">

            {Loading ? (
                <div className="flex flex-col items-center gap-4 mt-20">
                    <div className=" size-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : Error ? (
                <div className="flex flex-col items-center mt-20">
                    <p className="text-red-600 text-center font-medium">{Error}</p>
                    <button
                        onClick={() => fetchData()}
                        className="px-4 py-2 bg-red-500 mt-4 cursor-pointer text-white rounded-md hover:bg-red-600"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="horizontal" data={data} barCategoryGap={20}>
                    <CartesianGrid vertical={false} horizontal={true} strokeWidth={0.5} strokeDasharray="0" />

                    <YAxis
                        dataKey="value"
                        type="number"
                        width={30}
                        stroke="#9ca3af"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 14 }}
                    />

                    <XAxis
                        dataKey="name"
                        type="category"
                        fontSize={14}
                        stroke="#374151"
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                            return (
                            <div className="bg-white shadow-md p-2 rounded text-sm">
                                <p className="font-semibold">Nombre : {payload[0].value}</p>
                            </div>
                            );
                        }
                        return null;
                        }}
                    />

                    <Bar dataKey="value" radius={[20, 20, 0, 0]} barSize={100}>
                        {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}

        </div>
    );
}

export default OverviewVehicule;
