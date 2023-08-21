
import { useState } from "react";

import { RestartIcon, StartIcon } from "./Icon";

const options = ['Country', 'State/Province', 'City'];

export default function Roulette({ data }) {
    const [rouletteOption, setRouletteOption] = useState('');
    const [randomPlace, setRandomPlace] = useState('');

    const countries = data.data;
    const states = countries.flatMap(country => country.states);

    function handleClick(e) {
        setRouletteOption(e.target.innerText);
    };

    function handleRoulette(geography) {
        let list;
        console.log(geography);

        switch (geography) {
            case 'Country':
                list = countries;
                break;
            case 'State/Province':
                list = states;
                break;
            default:
                break;
        }

        // console.log('list', list);

        const randomIndex = Math.floor(Math.random() * list.length);
        setRandomPlace(list[randomIndex]);
    }



    function handleRestart() {
        setRouletteOption('');
        setRandomPlace('');
    }

    return (
        <div className="flex flex-col" >
            <h1 className="text-xl text-center">Travel Roulette</h1>
            {/* Main container */}
            <div id='roulette' className="border rounded-lg p-20 flex flex-col">
                <div id='roulette-options' className="flex justify-center gap-x-2">
                    {options.map((option, index) => (
                        <button key={index} onClick={handleClick} className={`p-2 border rounded-lg hover:bg-gray-100 ${option === rouletteOption && 'bg-gray-200'}`}>{option}</button>
                    ))}
                </div>

                {/* Buttons */}
                <div id='roulette-actions' className="flex gap-2 justify-center p-2">
                    <button onClick={handleRestart} className={'p-2 border rounded-lg hover:bg-red-500'}>
                        <RestartIcon />
                    </button>

                    <button disabled={rouletteOption === ''} onClick={() => handleRoulette(rouletteOption)} className="p-2 border rounded-xl hover:bg-green-500 ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200">
                        <StartIcon />
                    </button>
                </div>

                {/* random country */}
                {randomPlace && rouletteOption === 'Country' &&
                    (
                        <div id='results' className="flex flex-col justify-center p-2">
                            <span className="text-xl p-2 text-center">Go to: {randomPlace.name}!</span>
                            <div className="flex border rounded-xl p-20"></div>
                        </div>
                    )}

                {/* random state / city */}
                {/* once country is selected, give a dropdown of all states */}
                {/* OR chooses a random state based on the randomized country  */}

            </div>
        </div >
    );
}

const iso2FlagEmoji = iso => String.fromCodePoint(...[...iso.toUpperCase()].map(char => char.charCodeAt(0) + 127397));
