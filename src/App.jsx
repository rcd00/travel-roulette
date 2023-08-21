import { useEffect, useState } from 'react';
import Roulette from "./components/Roulette";

const countriesEndpoint = 'https://countriesnow.space/api/v0.1/countries/states';

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(countriesEndpoint)
      .then(response => response.json())
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      {isLoading ? 'LOADING' : (<Roulette data={data} />)}
    </div>
  );
}

export default App;
