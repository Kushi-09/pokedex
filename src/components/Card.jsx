// import React, { useState } from 'react';
// import { AiFillSound } from 'react-icons/ai';

// const Card = ({ pokemon, loading, infoPokemon }) => {
//     const [playingSound, setPlayingSound] = useState(null);
//     const [selectedPokemon, setSelectedPokemon] = useState(null);

//     // Function to play sound
//     const playSound = (pokemonId) => {
//         if (playingSound) {
//             playingSound.pause();
//             playingSound.currentTime = 0;
//         }

//         const soundUrl = `https://pokemoncries.com/cries-old/${pokemonId}.mp3`;
//         const audio = new Audio(soundUrl);
//         setPlayingSound(audio);

//         audio.oncanplaythrough = () => {
//             audio.play().catch(error => {
//                 console.error('Error playing sound:', error);
//             });
//         };
//     };

//     return (
//         <>
//             {loading ? (
//                 <h2>Loading...</h2>
//             ) : (
//                 pokemon.map(poke => (
//                     <div className="card" key={poke.id} onClick={() => {
//                         infoPokemon(poke);
//                         setSelectedPokemon(poke);
//                     }}>
//                         <p>{poke.id}</p>
//                         <h2>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
//                         <img src={poke.sprites.front_default} alt={poke.name} />
//                         {/* Sound Icon */}
//                         <button 
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 playSound(poke.id);
//                             }} 
//                             style={{ background: 'none', border: 'none', cursor: 'pointer' }}
//                         >
//                             <AiFillSound size={24} />
//                         </button>
//                     </div>
//                 ))
//             )}
            
//             {selectedPokemon && (
//                 <div className="pokemon-stats">
//                     <h3>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)} Stats</h3>
//                     {/* Removed the graph */}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Card;
import React, { useState } from 'react';
import { AiFillSound } from 'react-icons/ai';

// Function to capitalize the first letter of each word
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

// Function to get color based on Pokémon type
const getTypeColor = (type) => {
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };
    return typeColors[type] || '#777';
};

const Card = ({ pokemon, loading, infoPokemon }) => {
    const [playingSound, setPlayingSound] = useState(null);

    // Function to play sound
    const playSound = (pokemonId, e) => {
        e.stopPropagation();
        if (playingSound) {
            playingSound.pause();
            playingSound.currentTime = 0;
        }

        const soundUrl = `https://pokemoncries.com/cries-old/${pokemonId}.mp3`;
        const audio = new Audio(soundUrl);
        setPlayingSound(audio);

        audio.oncanplaythrough = () => {
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        };
    };

    return (
        <>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                pokemon.map(poke => (
                    <div className="card" key={poke.id} onClick={() => infoPokemon(poke)}>
                        <p className="pokemon-id">{poke.id}</p>
                        <h2>{capitalizeWords(poke.name)}</h2>
                        <img src={poke.sprites.front_default} alt={poke.name} />
                        <div className="card-footer">
                            <div className="type-pills">
                                {poke.types.map((type, index) => (
                                    <span 
                                        key={index} 
                                        className="type-pill"
                                        style={{
                                            backgroundColor: getTypeColor(type.type.name),
                                        }}
                                    >
                                        {capitalizeWords(type.type.name)}
                                    </span>
                                ))}
                            </div>
                            <button 
                                className="sound-button"
                                onClick={(e) => playSound(poke.id, e)}
                            >
                                <AiFillSound size={24} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Card;
