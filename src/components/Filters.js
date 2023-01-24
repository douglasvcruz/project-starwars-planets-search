import { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const { handleChange: { onChange, value } } = useContext(TableContext);

  return (
    <form>
      <input
        className="filter"
        data-testid="name-filter"
        type="text"
        onChange={ onChange }
        value={ value }
      />
    </form>
  );
}

export default Filters;
