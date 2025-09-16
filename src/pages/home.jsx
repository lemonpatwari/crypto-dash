import React from 'react';
import CoinCard from "../components/CoinCard.jsx";
import FilterInput from "../components/FilterInput.jsx";
import SortSelector from "../components/SortSelector.jsx";
import LimitSelector from "../components/LimitSelector.jsx";

function Home({coins, filter, setFilter,limit,setLimit,sortBy,setSortBy,loading,error}) {
    const filteredCoins = coins.filter((coin) => {
        if (!filter) return true;
        const lowerCaseFilter = filter.toLowerCase();
        return coin.name.toLowerCase().includes(lowerCaseFilter) || coin.symbol.toLowerCase().includes(lowerCaseFilter);
    })
        .slice()
        .sort((a, b) => {
            switch (sortBy) {
                case 'market_cap_desc':
                    return b.market_cap - a.market_cap;
                case 'market_cap_asc':
                    return a.market_cap - b.market_cap;
                case 'price_desc':
                    return b.current_price - a.current_price;
                case 'price_asc':
                    return a.current_price - b.current_price;
                case 'change_desc':
                    return b.price_change_percentage_24h - a.price_change_percentage_24h;
                case 'change_asc':
                    return a.price_change_percentage_24h - b.price_change_percentage_24h;
                default:
                    return 0;
            }
        })
    return (
        <>
            <h1> Crypto App </h1>

            {loading && <p>Loading........</p>}
            {error && <span className="error">{error}</span>}

            <div className="top-controls">
                <FilterInput
                    filter={filter}
                    onFilterChange={(newFilter) => setFilter(newFilter)}
                />

                <LimitSelector
                    limit={limit}
                    onLimitChange={(newLimit) => setLimit(newLimit)}
                />

                <SortSelector
                    sort={sortBy}
                    onSortChange={(newSort) => setSortBy(newSort)}
                />
            </div>

            {!loading && !error && (<main className="grid">
                {filteredCoins.length > 0 ? filteredCoins.map((coin, index) => (
                    <CoinCard coin={coin} key={index}/>)) : <p>No coins match your filter.</p>}
            </main>)}
        </>
    );
}

export default Home;