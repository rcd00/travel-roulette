
import { useState } from "react";

import { RestartIcon, StartIcon } from "./Icon";

const COUNTRY = 'Country';
const STATE = 'State/Province';

const options = [COUNTRY, STATE];

export default function Roulette({ data }) {
    const [rouletteOption, setRouletteOption] = useState('');
    const [randomPlace, setRandomPlace] = useState('');
    const [flag, setFlag] = useState('');
    const [selectedCountry, setSelectedCountry] = useState({});

    const countries = data.data;
    const countriesWithStates = countries.filter(country => country.states.length).sort((a, b) => a.name - b.name);


    function handleRestart(e) {
        e.preventDefault();

        setRouletteOption('');
        setRandomPlace('');
    }

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

    function handleGetRandomPlace(e) {

        setRandomPlace('');

        if (rouletteOption === COUNTRY) {
            const randomCountry = getRandomPlace(countries);
            setRandomPlace(randomCountry.name);
            setFlag(randomCountry.iso2);
        } else if (rouletteOption === STATE) {
            const countryOfState = countriesWithStates.find((country) => country.name === selectedCountry);
            const randomState = getRandomPlace(countryOfState.states);
            setRandomPlace(randomState.name);
            setFlag(countryOfState.iso2);
        }
    };

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
    const flagEmoji = iso2FlagEmoji(flag);

    const resultsMarkup = randomPlace !== '' && (
        <div id='results' className="flex flex-col justify-center pt-10">
            <h2 className="text-2xl text-center pb-2">Result</h2>
            <span className="text-xl p-2 text-center">{rouletteOption === COUNTRY ? `${flagEmoji} ${randomPlace} ${flagEmoji}` : `${flagEmoji} ${randomPlace}, ${selectedCountry} ${flagEmoji}`}</span>
            <span className="results-maps text-center">
                <a href={`https://www.google.com/maps/place/${rouletteOption === COUNTRY ? randomPlace : `${randomPlace}, ${selectedCountry}`}`} target='_blank' className="font-medium text-blue-600 dark:text-blue-500 hover:underline">See in google maps</a>
            </span>
        </div>
    );

    const randomStateMarkup = (
        <div className="flex flex-col p-2 justify-center">
            <div className="flex flex-col text-center p-2">
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
            <h1 className="text-3xl p-5 text-center">Travel Roulette</h1>
            {/* Main container */}
            <div id='roulette' className="flex flex-col">
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