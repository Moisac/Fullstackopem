import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Search } from './components/Search';

function App() {
const [countries, setCountries] = useState([]);
const [search, setSearch] = useState('');
const [showDetails, setShowDetails] = useState(false);

useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
}, [])

const handleSearch = e => {
  setSearch(e.target.value)
}

const searchResults = () => {
    return countries.filter(
      country => country.name.toLowerCase().includes(search.trim().toLowerCase())
    ) 
}

const showMore = () => {
    setShowDetails(true)
  }

  return (
    <>
    Search country by name: <input value={search} onChange={handleSearch}/>
      <Search countriesResults={searchResults()} search={search} showMore={showMore} showDetails={showDetails} countries={countries}/>
    </>
  );
}

export default App;
