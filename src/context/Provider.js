import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const optionsComparison = ['maior que', 'menor que', 'igual a'];

  const [data, setData] = useState([]);
  const [isFetching, setIsfetching] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [select, setSelect] = useState(options[0]);
  const [comparison, setComparison] = useState(optionsComparison[0]);
  const [value, setValue] = useState('0');

  const [options1, setOptions1] = useState(options);
  const [options2, setOptions2] = useState(optionsComparison);

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const getPlanets = async () => {
    const msg = 'service unavailable';
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    try {
      setIsfetching(true);
      const request = await fetch(URL);
      const { results } = await request.json();
      results.forEach((el) => delete el.residents);
      setIsfetching(false);
      setData(results);
      setFilteredData(results);
      setHeaders(Object.keys(results[0]));
    } catch (error) {
      global.alert(msg);
    }
  };

  const applyFilter = () => {
    const { filterByName: { name } } = filters;
    if (name === '') {
      return setFilteredData(data);
    }
    return setFilteredData(data
      .filter((e) => e.name.toLowerCase().includes(name.toLowerCase())));
  };

  const handleFilters = () => {
    const { filterByNumericValues } = filters;
    const itens = filterByNumericValues.length === 0 ? data : filteredData;
    if (comparison === 'maior que') {
      setFilteredData(itens.filter((el) => el[select] > Number(value)));
    }
    if (comparison === 'menor que') {
      setFilteredData(itens.filter((el) => el[select] < Number(value)));
    }
    if (comparison === 'igual a') {
      setFilteredData(itens.filter((el) => el[select] === value));
    }
    const obj = {
      column: select,
      comparison,
      value,
    };
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, obj],
    });
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const { filterByName: { name } } = filters;

  useEffect(() => {
    applyFilter();
  }, [name]);

  const context = {
    isFetching,
    data,
    headers,
    filteredData,
    setFilteredData,
    select,
    setSelect,
    comparison,
    setComparison,
    value,
    setValue,
    setFilters,
    filters,
    handleFilters,
    options1,
    options2,
    setOptions1,
    setOptions2,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
