import React from 'react';
import { Weather } from '../components/Weather';

export const Search = ({ search, countriesResults, showDetails, showMore }) => {
    return (
        <>
            {search === '' ? 
                    <p>Search to view results here</p> 
                : countriesResults.length > 10 ? 
                    <p>Too many matches, continue typing</p>
                : countriesResults.length <= 10 && countriesResults.length > 1 ? 
                    countriesResults.map((country) => (
                    <div key={country.name}>
                        {country.name}
                        <button value={country.name} onClick={showMore}>Show details</button>
                        {showDetails &&
                        <div key={country.name}>
                            <h2>{country.name}</h2>
                            <p>Capital: {country.capital}</p>
                            <Weather capital={country.capital}/>
                            <p>Population: {country.population}</p><br />
                            <h3>Languages</h3>
                            <ul>
                                {
                                    country.languages.map((language) => (
                                        <li key={language.iso639_1}>{ language.name }</li>
                                    ))
                                }
                            </ul>
                            <img style={{ width: '150px' }} src={country.flag} alt={country.name}/>
                        </div>
                        }
                    </div>
                    ))
                : countriesResults.length === 1 ?
                    countriesResults.map((country) => (
                        <div key={country.name}>
                            <h2>{country.name}</h2>
                            <p>Capital: {country.capital}</p>
                            <h4>Weather in {country.capital}</h4>
                            <Weather capital={country.capital}/>
                            <p>Population: {country.population}</p><br />
                            <h3>Languages</h3>
                            <ul>
                                {
                                    country.languages.map((language) => (
                                        <li key={language.iso639_1}>{ language.name }</li>
                                    ))
                                }
                            </ul>
                            <img style={{ width: '150px' }} src={country.flag} alt={country.name}/>
                        </div>
                        ))
                : <p>No results found.</p>
            }
        </>
    )
}
