import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SearchBar() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const { filterByName: { name } } = filters;
  return (
    <>
      <div
        className="name-filter"
      >
        <label
          htmlFor="searchBar"
        >
          Filtrar por nome:
          <input
            data-testid="name-filter"
            id="searchBar"
            type="text"
            name="searchBar"
            value={ name }
            onChange={ (e) => setFilters({
              ...filters,
              filterByName: {
                name: e.target.value,
              },
            }) }
          />
        </label>
      </div>
      <hr />
    </>
  );
}

export default SearchBar;
