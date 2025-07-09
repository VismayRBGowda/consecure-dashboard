import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ThreatTable() {
  const navigate = useNavigate();
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchThreats();
  }, [page, search, category]);

  const fetchThreats = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/threats", {
        params: {
          page,
          limit,
          search,
          category,
        },
      });
      setThreats(res.data.data); // set data array
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetchhing threats : ", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 pt-0">
      <div className="flex justify-between">
        <h2 className="text-2xl mt-0 text-amber-500 font-bold mx-4 mb-4">Threats</h2>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search Description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-[3px] w-[20vw] border-blue-300 rounded-full p-2 px-4 text-white bg-transparent focus:border-blue-300 focus:ring-0 outline-none "
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 px-3 border-blue-300 rounded-full border-[3px] bg-transparent text-gray-300 focus:border-blue-300 focus:ring-0 outline-none">  
              <option className="text-gray-300 bg-neutral-800" value="">All Categories</option>
              <option  className="text-gray-300 bg-neutral-800" value="Malware">Malware</option>
              <option  className="text-gray-300 bg-neutral-800" value="Phishing">Phishing</option>
              <option  className="text-gray-300 bg-neutral-800" value="DDoS">DDoS</option>
              <option  className="text-gray-300 bg-neutral-800" value="Ransomware">Ransomware</option>
          </select>
        </div>
      </div>


      {/* Table */}

      {loading ? (
        <p>Loading Threats...</p>
      ) : (
        <table className="min-w-full border rounded-full border-gray-300">
            <thead className="bg-amber-500">
                <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Actor</th>
                    <th className="p-2 border">Vector</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Severity</th>
                </tr>
            </thead>
            <tbody className="">
                {threats.map((t, index) => (
                    <tr key={t._id} onClick={() => navigate(`/threats/${t._id}`)} className="odd:bg-neutral-700 even:bg-neutral-600 text-gray-300 ">
                        <td className="p-3 border border-black">{(page-1) * limit + index + 1}</td>
                        <td className="p-3 border border-black">{t.threat_category}</td>
                        <td className="p-3 border border-black">{t.threat_actor}</td>
                        <td className="p-3 border border-black">{t.attack_vector}</td>
                        <td className="p-3 border border-black">{t.description.slice(0, 70)}</td>
                        <td className="p-3 border border-black text-center">{t.severity_score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}

      {/* pagination */}
      <div className="flex justify-between mt-4">
        <button
            onClick={() => setPage((p) => Math.max(1, p-1))}
            disabled={page === 1}
            className="px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:opacity-50 disabled:cursor-auto"
        >
            Previous
        </button>
        <span className="px-4 py-2 text-white">Page {page} / {Math.ceil(total / 10)}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
          className="px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:cursor-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ThreatTable;