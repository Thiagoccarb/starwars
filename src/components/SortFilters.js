import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SortFilters() {
  const { headers,
    setFilters,
    filters,
  } = useContext(StarWarsContext);
  const { order: { column } } = filters;
  const validade = document.querySelector('input[type="radio"]:checked');

  const handleSortFilter = () => {
    const element = document.querySelector('input[type="radio"]:checked');
    const { value } = element;
    setFilters({
      ...filters,
      order: { ...filters.order, sort: value },
    });
  };

  return (
    <>
      <hr />
      <div
        className="sort-options"
      >
        <label
          htmlFor="select"
        >
          ordenar por:
          <select
            data-testid="column-sort"
            name="select"
            value={ column }
            onChange={ (e) => setFilters({
              ...filters,
              order: { ...filters.order, column: e.target.value },
            }) }
          >
            {
              headers.map((el, i) => (
                <option
                  key={ i }
                >
                  {el}
                </option>
              ))
            }
          </select>
        </label>
        <label
          htmlFor="ASC"
        >
          Ordem:
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            id="ASC"
            name="order"
            value="ASC"
          // onChange={ () => setFilters({
          //   ...filters,
          //   order: { ...filters.order, sort: 'ASC' },
          // }) }
          />
          ASC
        </label>
        <label
          htmlFor="DESC"
        >
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            id="DESC"
            name="order"
            value="DESC"
          // onChange={ () => setFilters({
          //   ...filters,
          //   order: { ...filters.order, sort: 'DESC' },
          // }) }
          />
          DESC
        </label>
        <button
          disabled={ !validade }
          onClick={ handleSortFilter }
          data-testid="column-sort-button"
          type="button"
        >
          Ordenar
        </button>
      </div>
      <hr />
    </>
  );
}

export default SortFilters;
