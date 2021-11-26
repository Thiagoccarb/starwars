import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SearchHistory() {
  const { filters,
    setFilters,
    data,
    setFilteredData,
    options1,
    setOptions1,
  } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;

  const updateOptions = (i) => {
    const filteredOption1 = filterByNumericValues[i].column;
    console.log(filterByNumericValues[i].column);
    setOptions1([...options1, filteredOption1]);
  };

  const updatefilterByNumericValues = (i) => {
    const element = filterByNumericValues[i].column;
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((el) => el.column !== element),
    });
  };

  const updateFilters = (value1, value2, value3) => {
    if (value2 === 'maior que') {
      setFilteredData(data.filter((el) => el[value1] > Number(value3)));
    }
    if (value2 === 'menor que') {
      setFilteredData(data.filter((el) => el[value1] < Number(value3)));
    }
    if (value2 === 'igual a') {
      setFilteredData(data.filter((el) => el[value1] === value3));
    }
  };

  const updateTable = (i) => {
    if (filterByNumericValues.length > 1 && i > 0) {
      const value1 = filterByNumericValues[i - 1].column;
      const value2 = filterByNumericValues[i - 1].comparison;
      const value3 = filterByNumericValues[i - 1].value;
      return updateFilters(value1, value2, value3);
    }
    return setFilteredData(data);
  };

  const handleClick = (i) => {
    updateOptions(i);
    updatefilterByNumericValues(i);
    updateTable(i);
  };

  return (
    <>
      <h1>Filtros</h1>
      <ol>
        {
          filterByNumericValues.map((el, i) => (
            <div
              className="filter-history"
              data-testid="filter"
              key={ i }
            >
              <li>
                {`${el.column}-${el.comparison}-${el.value}`}
              </li>
              <button
                type="button"
                onClick={ () => handleClick(i) }
              >
                x
              </button>
            </div>
          ))
        }
      </ol>
    </>
  );
}

export default SearchHistory;
