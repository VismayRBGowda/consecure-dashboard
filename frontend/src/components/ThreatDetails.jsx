import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ThreatDetails(){
    const {id} = useParams();
    const [threat, setThreat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchThreat = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/threats/${id}`);
                setThreat(res.data);
            }
            catch(err){
                console.error("Failed to fetch threat:", err);
            }
            finally{
                setLoading(false);
            }
        };

        fetchThreat();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading threat details...</div>;
    if (!threat?.data) return <div className="text-center mt-10 text-red-600">Threat not found</div>;

    const t = threat.data;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-neutral-800 shadow rounded">
            <h2 className="text-2xl font-bold text-center text-amber-500 mb-4">Threat Details</h2>
            <div className="space-y-2">
                <div  className="text-white"><strong className="text-sky-500">Category:</strong> {t.threat_category}</div>
                <div  className="text-white"><strong className="text-sky-500">Actor:</strong> {t.threat_actor}</div>
                <div  className="text-white"><strong className="text-sky-500">Attack Vector:</strong> {t.attack_vector}</div>
                <div  className="text-white"><strong className="text-sky-500">Description:</strong> {t.description}</div>
                <div  className="text-white"><strong className="text-sky-500">Severity Score:</strong> {t.severity_score}</div>
                <div  className="text-white"><strong className="text-sky-500">Risk Level:</strong> {t.risk_level}</div>
                <div  className="text-white"><strong className="text-sky-500">Location:</strong> {t.location}</div>
                <div  className="text-white"><strong className="text-sky-500">Suggested Defense:</strong> {t.defense_mechanism}</div>
                <div  className="text-white"><strong className="text-sky-500">Keywords:</strong> {t.keywords.join(', ')}</div>
                <div  className="text-white"><strong className="text-sky-500">Named Entities:</strong> {t.named_entities.join(', ')}</div>
                <div  className="text-white"><strong className="text-sky-500">Predicted Category:</strong> {t.predicted_category}</div>
                <div  className="text-white"><strong className="text-sky-500">IOCs:</strong> {t.iocs.join(', ')}</div>
                <div  className="text-white"><strong className="text-sky-500">Forum Sentiment:</strong> {t.forum_sentiment}</div>
                <div  className="text-white"><strong className="text-sky-500">Topic Label:</strong> {t.topic_label}</div>
                <div  className="text-white"><strong className="text-sky-500">Word Count:</strong> {t.word_count}</div>
            </div>
        </div>
    );
}

export default ThreatDetails;