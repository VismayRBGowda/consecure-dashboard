import { useState, useEffect } from "react";
import axios from "axios";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

function Dashboard(){

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        async function fetchStats() {
            try{
                const response = await axios.get("http://localhost:5000/api/threats/stats");
                setStats(response.data);
            }
            catch(err){
                console.error("Error fetching stats:", err);
            }
            finally{
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) return <p className="text-center">Loading stats...</p>;
    if (!stats) return <p className="text-center">No data available</p>;

    return (
        <div className="box select-none">
            <h1 className="text-xl text-amber-500 select-none font-bold mb-6 text-center">Threats Stats</h1>
            <div className="flex">
                <div className="grid grid-cols-1 md:grid-rows-2 gap-8 max-h-[80vh] flex-1 p-0 mx-3">
                    <DoughnutChart title="By Category" data={stats.categoryCounts} />
                    <DoughnutChart title="By Severity" data={stats.severityCounts} />
                </div>
                <div className="m-3 p-4 mt-0 flex flex-col items-start gap-2">
                    <div className="counts bg-red-400 gap-2 flex rounded  cursor-pointer flex-col justify-center h-[15vh] w-[20vw]">
                        <h1 className="font-bold text-sm text-white text-left mx-4">Total Threats</h1>
                        <h2 className="font-bold mx-4 text-5xl text-white">{stats.totalThreats}</h2>
                    </div>
                    <BarChart title="By Location" data={stats.locationCounts} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;