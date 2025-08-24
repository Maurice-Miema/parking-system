import { ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts'

const data = [
    { name: 'Lundi', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Mardi', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mercredi', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Jeudi', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Vendredi', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Samedi', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Dimanche', uv: 3490, pv: 4300, amt: 2100 },
]

function EngagementOverview() {
    return (
        <div className="w-full sm:h-[18rem] h-70 border border-gray-200 rounded-lg p-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    data={data} 
                    width={500}
                    height={300} 
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >

                    <CartesianGrid 
                        vertical={false} 
                        horizontal={true}
                        // stroke="#d1d5db"
                        strokeWidth={0.5}
                        strokeDasharray="0" 
                    />

                    <XAxis 
                        dataKey="name"
                        tick={{ fontSize: 14 }}
                        stroke='#374151'
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        dataKey="pv"
                        fontSize={10}
                        stroke='#9ca3af'
                        tickLine={false}
                        axisLine={false}
                        width={30}
                    />

                    <Tooltip />
                    <Line type="monotone" dataKey="pv" stroke="#0a0a0a" strokeWidth={2} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EngagementOverview
