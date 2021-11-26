import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const {
    select,
    setSelect,
    comparison,
    setComparison,
    value,
    setValue,
    handleFilters,
    options1,
    options2,
    setOptions1,
    // setOptions2,
    // filters,
  } = useContext(StarWarsContext);

  const ClearInputs = () => {
    setSelect('');
    setComparison('');
    setValue('');
  };

  const handleClick = () => {
    handleFilters();
    setOptions1(options1.filter((el) => el !== select));
    // setOptions2(options2.filter((el) => el !== comparison));
    ClearInputs();
  };

  return (
    <div
      className="main-filters"
    >
      <label
        htmlFor="select"
      >
        Filtrar por:
        <select
          data-testid="column-filter"
          name="select"
          value={ select }
          onChange={ (e) => setSelect(e.target.value) }
        >
          {
            options1.map((el, i) => (
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
        htmlFor="select2"
      >
        Comparação:
        <select
          data-testid="comparison-filter"
          name="select2"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
        >
          {
            options2.map((e, i) => (
              <option
                key={ i }
              >
                {e}
              </option>
            ))
          }
        </select>
      </label>
      <label
        htmlFor="input"
      >
        Valor:
        <input
          type="text"
          data-testid="value-filter"
          name="input"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        disabled={ !(select && comparison && value) }
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
