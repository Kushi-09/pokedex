import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        await getPokemon(res.data.results);
        setLoading(false);
    };

    const getPokemon = async (res) => {
        const promises = res.map(item => axios.get(item.url));
        const results = await Promise.all(promises);

        const newPokeData = results.map(result => result.data);
        newPokeData.sort((a, b) => (a.id > b.id ? 1 : -1));

        setPokeData(newPokeData);
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
        
        <><div><h1 className="top">POKEDEX</h1></div>
            <div className="container">
                
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                    <div className="btn-group">
                        {prevUrl && (
                            <button
                                onClick={() => {
                                    setPokeData([]);
                                    setUrl(prevUrl);
                                }}
                            >
                                Previous
                            </button>
                        )}
                        {nextUrl && (
                            <button
                                onClick={() => {
                                    setPokeData([]);
                                    setUrl(nextUrl);
                                }}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
        </>
    );
};

export default Main;
