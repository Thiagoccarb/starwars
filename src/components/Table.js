import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    headers,
    isFetching,
    filteredData,
    filters,
  } = useContext(StarWarsContext);

  const { order: { column, sort } } = filters;

  const tableElements = (
    <table>
      <thead>
        <tr>
          {
            headers.map((el, index) => (
              <th
                key={ index }
              >
                {el}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          filteredData.sort((a, b) => {
            let fieldA = a[column];
            let fieldB = b[column];
            if (fieldA === 'unknown') fieldA = 0;
            if (fieldB === 'unknown') fieldB = 0;
            if (!Number.isNaN(Number(fieldA))) {
              fieldA = Number(fieldA);
              fieldB = Number(fieldB);
            }
            if (fieldA > fieldB) {
              return sort === 'ASC' ? 1 : +'-1';
            }
            if (fieldA < fieldB) {
              return sort === 'ASC' ? +'-1' : 1;
            }
            return 0;
          })
            .map((element, ind) => (
              <tr
                key={ ind }
              >
                {
                  Object.values(element).map((e, i) => (
                    <td
                      data-testid={ i === 0 ? 'planet-name' : null }
                      key={ i }
                    >
                      {e}
                    </td>
                  ))
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );

  const element = filteredData.length > 0
    ? tableElements : <h1>Sorry, there is no data that matches the filter criteria</h1>;

  return (
    isFetching ? <h1>Loading...</h1> : element
  );
}

export default Table;
