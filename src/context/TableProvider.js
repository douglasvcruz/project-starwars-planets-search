/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import TableContext from './TableContext';
import useFetch from '../hooks/useFetch';
import useHandleChange from '../hooks/useHandleChange';

function TableProvider({ children }) {
  const { data } = useFetch('https://swapi.dev/api/planets');
  const searchHandleChange = useHandleChange('');
  const columnHandleChange = useHandleChange('population');
  const comparisonHandleChange = useHandleChange('maior que');
  const inputHandleChange = useHandleChange(0);
  const sortHandleChange = useHandleChange('population');
  const checkedSortHandleChange = useHandleChange('');

  const [filtered, setFiltered] = useState('');

  const handleOrder = () => {
    const column = sortHandleChange.value;
    const sort = checkedSortHandleChange.value;

    if (sort === 'ASC') {
      const sorted = data.filter((d) => d[column] !== 'unknown')
        .sort((a, b) => a[column] - b[column]);
      console.log(sorted);
      setFiltered([...sorted, ...data.filter((d) => d[column] === 'unknown')]);
    } else {
      const sorted = data.filter((d) => d[column] !== 'unknown')
        .sort((a, b) => b[column] - a[column]);
      setFiltered([...sorted, ...data.filter((d) => d[column] === 'unknown')]);
    }
  };

  const dataFilter = filtered.length !== 0
    ? filtered
    : data.filter(({ name }) => name.includes(searchHandleChange.value));

  const handleSubmit = () => {
    const column = columnHandleChange.value;
    const comparison = comparisonHandleChange.value;
    const input = inputHandleChange.value;
    if (comparison === 'maior que') {
      setFiltered(
        filtered.length === 0
          ? data.filter((d) => Number(d[column]) > Number(input))
          : filtered.filter((d) => Number(d[column]) > Number(input)),
      );
    } else if (comparison === 'menor que') {
      setFiltered(
        filtered.length === 0
          ? data.filter((d) => Number(d[column]) < Number(input))
          : filtered.filter((d) => Number(d[column]) < Number(input)),
      );
    } else if (comparison === 'igual a') {
      setFiltered(
        filtered.length === 0
          ? data.filter((d) => Number(d[column]) === Number(input))
          : filtered.filter((d) => Number(d[column]) === Number(input)),
      );
    }
  };

  const values = useMemo(
    () => ({
      data,
      searchHandleChange,
      dataFilter,
      columnHandleChange,
      comparisonHandleChange,
      inputHandleChange,
      handleSubmit,
      filtered,
      sortHandleChange,
      checkedSortHandleChange,
      handleOrder,
    }),
    [
      data,
      searchHandleChange,
      dataFilter,
      columnHandleChange,
      comparisonHandleChange,
      inputHandleChange,
      handleSubmit,
      filtered,
      sortHandleChange,
      checkedSortHandleChange,
      handleOrder,
    ],
  );

  return (
    <TableContext.Provider value={ values }>
      <div className="App">{children}</div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
