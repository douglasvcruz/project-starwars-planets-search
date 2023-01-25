import { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const {
    searchHandleChange,
    columnHandleChange,
    comparisonHandleChange,
    inputHandleChange,
    handleSubmit,
    sortHandleChange,
    checkedSortHandleChange,
    handleOrder,
  } = useContext(TableContext);

  const arrayOptions = [
    'population',
    'orbital_period',
    'rotation_period',
    'diameter',
    'surface_water',
  ];

  return (
    <form>
      <input
        className="filter"
        data-testid="name-filter"
        type="text"
        onChange={ searchHandleChange.onChange }
        value={ searchHandleChange.value }
      />
      <section className="filters">
        <select
          onChange={ columnHandleChange.onChange }
          value={ columnHandleChange.value }
          data-testid="column-filter"
        >
          { arrayOptions.map((a, i) => (
            <option key={ i } value={ a }>{a}</option>
          ))}
        </select>
        <select
          onChange={ comparisonHandleChange.onChange }
          value={ comparisonHandleChange.value }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          onChange={ inputHandleChange.onChange }
          value={ inputHandleChange.value }
          type="text"
          data-testid="value-filter"
          className="input-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          className="button"
          onClick={ handleSubmit }
        >
          FILTRAR
        </button>
        <select
          onChange={ sortHandleChange.onChange }
          value={ sortHandleChange.value }
          data-testid="column-sort"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="rotation_period">rotation_period</option>
          <option value="diameter">diameter</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="asc">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ checkedSortHandleChange.value === 'ASC' }
            onChange={ checkedSortHandleChange.onChange }
          />
          Ascendente
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ checkedSortHandleChange.value === 'DESC' }
            onChange={ checkedSortHandleChange.onChange }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          className="button"
          onClick={ handleOrder }
        >
          ORDENAR
        </button>
      </section>
    </form>
  );
}

export default Filters;
