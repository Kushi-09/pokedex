import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Pokeinfo = ({ data }) => {
    // Format stats for Recharts
    const formatStats = (stats) => stats.map(stat => ({
        stat: stat.stat.name,
        base_stat: stat.base_stat
    }));

    return (
        <>
            {(!data) ? "" : (
                <>
                    <h1>{data.name}</h1>
                    <img 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} 
                        alt={data.name}
                    />
                    <div className="abilities">
                        {data.abilities.map(poke => (
                            <div className="group" key={poke.ability.name}>
                                <h2>{poke.ability.name}</h2>
                            </div>
                        ))}
                    </div>
                    
                    <div className="base-stat" style={{ marginRight: '20px' }}>
                        {data.stats.length > 0 && (
                            <BarChart width={500} height={300} data={formatStats(data.stats)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="stat" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="base_stat" fill="#8884d8" />
                            </BarChart>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Pokeinfo;
