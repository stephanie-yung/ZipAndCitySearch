import './App.css';
import ZipSearch from './ZipSearch.js'
import CitySearchAPI from './citySearch.js';

function App() {
  return (
    <div className="App">
        <ZipSearch />
        <CitySearchAPI />
    </div>
  );
}

export default App;