import PropTypes from 'prop-types';
import { useMemo } from 'react';
import TableContext from './TableContext';
import useFetch from '../hooks/useFetch';
import useHandleChange from '../hooks/useHandleChange';

function TableProvider({ children }) {
  const { data } = useFetch('https://swapi.dev/api/planets');
  const handleChange = useHandleChange('');
  const dataFilter = data.filter(({ name }) => name.includes(handleChange.value));

  const values = useMemo(() => ({
    data, handleChange, dataFilter,
  }), [data, handleChange, dataFilter]);

  return (
    <TableContext.Provider value={ values }>
      <div className="App">
        { children }
      </div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
