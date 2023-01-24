import { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const { searchHandleChange,
    columnHandleChange,
    comparisonHandleChange,
    inputHandleChange,
    handleSubmit,
  } = useContext(TableContext);

  return (
    <form>
      <input
        className="filter"
        data-testid="name-filter"
        type="text"
        onChange={ searchHandleChange.onChange }
        value={ searchHandleChange.value }
      />
      <select
        onChange={ columnHandleChange.onChange }
        value={ columnHandleChange.value }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="rotation_period">rotation_period</option>
        <option value="diameter">diameter</option>
        <option value="surface_water">surface_water</option>
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
        onClick={ () => handleSubmit() }
      >
        FILTRAR
      </button>
    </form>
  );
}

export default Filters;
