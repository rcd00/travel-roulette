
import { useState } from "react";

import { RestartIcon, StartIcon } from "./Icon";

const COUNTRY = 'Country';
const STATE = 'State/Province';
const CITY = 'City';

const options = [COUNTRY, STATE, CITY];

export default function Roulette({ data }) {
    const [rouletteOption, setRouletteOption] = useState('');
    const [randomPlace, setRandomPlace] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({});

    const countries = data.data;
    const countriesWithStates = countries.filter(country => country.states.length).sort((a, b) => a.name - b.name);

    function handleGetRandomPlace(e) {

        setRandomPlace('');

        if (rouletteOption === COUNTRY) {
            const randomCountry = getRandomPlace(countries);
            setRandomPlace(randomCountry.name);
        } else if (rouletteOption === STATE) {
            const countryStates = countriesWithStates.find((country) => country.name === selectedCountry).states;
            const randomState = getRandomPlace(countryStates);
            setRandomPlace(randomState.name);
        }
    };

    console.log(randomPlace);

    function handleRoulette(e) {
        e.preventDefault();

        setRandomPlace('');
        setSelectedCountry('');
        setRouletteOption('');

        setRouletteOption(e.target.innerText);
    }

    function handleSelectRegion(e) {
        e.preventDefault();
        setSelectedCountry(e.target.innerText);
        console.log(selectedCountry);
    }

    function handleRestart(e) {
        e.preventDefault();

        setRouletteOption('');
        setRandomPlace('');
    }

    function handleDisableStart() {
        if (rouletteOption === '') {
            return true;
        } else if (rouletteOption === STATE && selectedCountry === '') {
            return true;
        } else {
            return false;
        }
    }

    const buttonIsDisabled = handleDisableStart();

    const resultsMarkup = randomPlace !== '' && (
        <div id='results' className="flex flex-col justify-center p-2">
            <span className="text-xl p-2 text-center">Go to: {randomPlace}!</span>
            <div className="flex border rounded-xl p-20"></div>
        </div>
    );

    const randomStateMarkup = (
        <div className="flex flex-col p-2 justify-center">
            <div className="flex flex-col text-center pb-2">
                Pick a country:
            </div>
            <div id='countries-with-states' className="flex flex-wrap justify-center gap-2">
                {countriesWithStates.map((country, idx) => (
                    <button onClick={handleSelectRegion} key={idx} className={`p-2 border rounded-lg hover:bg-gray-100 ${country.name === selectedCountry && 'bg-gray-200'}`}>{country.name}</button>
                ))}
            </div>
            {randomPlace !== '' && resultsMarkup}
        </div>
    );

    return (
        <div className="flex flex-col" >
            <h1 className="text-xl text-center">Travel Roulette</h1>
            {/* Main container */}
            <div id='roulette' className="border rounded-lg p-20 flex flex-col">
                <div id='roulette-options' className="flex justify-center gap-x-2">
                    {options.map((option, index) => (
                        <button key={index} onClick={handleRoulette} className={`p-2 border rounded-lg hover:bg-gray-100 ${option === rouletteOption && 'bg-gray-200'}`}>{option}</button>
                    ))}
                </div>

                {/* Buttons */}
                <div id='roulette-actions' className="flex gap-2 justify-center p-2">
                    {/* restart */}
                    <button onClick={handleRestart} className={'p-2 border rounded-lg hover:bg-red-500'}>
                        <RestartIcon />
                    </button>

                    {/* start */}
                    <button disabled={buttonIsDisabled} onClick={() => handleGetRandomPlace(rouletteOption)} className="p-2 border rounded-xl hover:bg-green-500 ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200">
                        <StartIcon />
                    </button>
                </div>

                {/* random country */}
                {randomPlace && rouletteOption === COUNTRY && resultsMarkup}

                {/* random state */}
                {rouletteOption === STATE && randomStateMarkup}
            </div>
        </div >
    );
}

const iso2FlagEmoji = iso => String.fromCodePoint(...[...iso.toUpperCase()].map(char => char.charCodeAt(0) + 127397));

function getRandomPlace(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}