import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav className='bg-zinc-800 p-4 text-white shadow'>
            <div className="flex justify-between items-center max-w-7xl mx-auto h-[8vh]">
                <h1 className="text-xl font-semibold text-sky-500">Threat Intelligence Dashboard</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline hover:text-sky-500 font-semibold text-lg">Home</Link>
                    <Link to="/dashboard" className="hover:underline hover:text-sky-500 font-semibold text-lg">Dashboard</Link>
                    <Link to="/threats" className="hover:underline hover:text-sky-500 font-semibold text-lg">Threats</Link>
                    <Link to="/analyze" className="hover:underline hover:text-sky-500 font-semibold text-lg">Analysis</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;