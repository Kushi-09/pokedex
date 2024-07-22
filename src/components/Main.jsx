import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import useScrollRestoration from "./useScrollRestoration";
import './style.css'; // Import the CSS file

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=20");
    const [pokeDex, setPokeDex] = useState(null);

    // Function to fetch Pokémon data
    const fetchPokemonData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(nextUrl);
            setNextUrl(res.data.next);
            const newPokeData = await getPokemon(res.data.results);
            setPokeData(prevData => {
                const newPokemonSet = new Set(prevData.map(poke => poke.id));
                const uniqueNewPokeData = newPokeData.filter(poke => !newPokemonSet.has(poke.id));
                return [...prevData, ...uniqueNewPokeData];
            });
            if (!pokeDex && newPokeData.length > 0) {
                setPokeDex(newPokeData[0]); // Set the first Pokémon as the default
            }
        } catch (error) {
            console.error("Error fetching Pokémon data: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch detailed Pokémon data
    const getPokemon = async (results) => {
        const promises = results.map(item => axios.get(item.url));
        const responses = await Promise.all(promises);
        return responses.map(response => response.data);
    };

    // Handle scroll event to trigger fetching more data
    const handleScroll = useCallback(() => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (bottom && nextUrl && !loading) {
            fetchPokemonData();
        }
    }, [loading, nextUrl]);

    // Attach and clean up scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Initial data fetch
    useEffect(() => {
        fetchPokemonData();
    }, []);

    // Custom hook for scroll restoration
    useScrollRestoration();

    return (
        <>
            <div><h1 className="top">POKEDEX</h1></div>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                </div>
                <div className="right-content">
                    {pokeDex && <Pokeinfo data={pokeDex} />}
                </div>
            </div>
            {loading && <div className="loading">Loading...</div>}
        </>
    );
};

export default React.memo(Main);
