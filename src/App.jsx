import {useEffect, useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router";
import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";
import Header from "./components/Header.jsx";
import NotFoundPage from "./pages/not-found.jsx";
import CoinDetails from "./pages/coin-details.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(5);
    const [filter, setFilter] = useState();
    const [sortBy, setSortBy] = useState('market_cap_desc');

    useEffect(() => {

        const fetchCoins = async () => {
            try {
                const response = await fetch(`${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();

    }, [limit]);

    return (<>
        <Header/>
        <Routes>
            <Route path="/" element={<Home
                coins={coins}
                filter={filter}
                setFilter={setFilter}
                limit={limit}
                setLimit={setLimit}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
                error={error}
            />}/>

            <Route path="/about" element={<About/>}/>
            <Route path="/coin/:id" element={<CoinDetails/>}/>

            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </>)
}

export default App
