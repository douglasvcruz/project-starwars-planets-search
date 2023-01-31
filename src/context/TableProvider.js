/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import TableContext from './TableContext';
import useFetch from '../hooks/useFetch';
import useHandleChange from '../hooks/useHandleChange';
import { arrayOptions } from '../data';

function TableProvider({ children }) {
  const { data } = useFetch('https://swapi.dev/api/planets');
  const searchHandleChange = useHandleChange('');
  const columnHandleChange = useHandleChange('population');
  const comparisonHandleChange = useHandleChange('maior que');
  const inputHandleChange = useHandleChange(0);
  const sortHandleChange = useHandleChange('population');
  const checkedSortHandleChange = useHandleChange('');

  const [filtered, setFiltered] = useState('');
  const [items, setItems] = useState('');
  const [options, setOptionsFiltered] = useState(arrayOptions);

  const handleOrder = () => {
    const column = sortHandleChange.value;
    const sort = checkedSortHandleChange.value;

    if (sort === 'ASC') {
      const sorted = data.filter((d) => d[column] !== 'unknown')
        .sort((a, b) => a[column] - b[column]);
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

  const column = columnHandleChange.value;
  const comparison = comparisonHandleChange.value;
  const input = inputHandleChange.value;

  const obj = [{
    column, comparison, input,
  }];

  const handleSubmit = () => {
    let filtrando = filtered.length === 0 ? data : filtered;
    if (comparison === 'maior que') {
      filtrando = filtrando.filter((d) => Number(d[column]) > Number(input));
    } else if (comparison === 'menor que') {
      filtrando = filtrando.filter((d) => Number(d[column]) < Number(input));
    } else if (comparison === 'igual a') {
      filtrando = filtrando.filter((d) => Number(d[column]) === Number(input));
    }
    const optionsFiltered = options.filter((o) => o !== column);
    setFiltered(filtrando);
    setItems([...items, ...obj]);
    setOptionsFiltered(optionsFiltered);
    columnHandleChange.setValue(optionsFiltered[0]);
  };

  const removeButton = (e) => {
    const itemsFiltered = items.filter((a) => a.column !== e.column);
    let filtrando = data;
    itemsFiltered.forEach((a) => {
      if (a.comparison === 'maior que') {
        filtrando = filtrando.filter((d) => Number(d[a.column]) > Number(a.input));
      } else if (a.comparison === 'menor que') {
        filtrando = filtrando.filter((d) => Number(d[a.column]) < Number(a.input));
      } else {
        filtrando = filtrando.filter((d) => Number(d[a.column]) === Number(a.input));
      }
    });
    setItems(itemsFiltered);
    setOptionsFiltered([...options, e.column]);
    setFiltered(filtrando);
  };

  const removeAllFilter = () => {
    setFiltered(data);
    setOptionsFiltered(arrayOptions);
    setItems('');
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
      sortHandleChange,
      checkedSortHandleChange,
      handleOrder,
      options,
      items,
      removeButton,
      removeAllFilter,
    }),
    [
      data,
      searchHandleChange,
      dataFilter,
      columnHandleChange,
      comparisonHandleChange,
      inputHandleChange,
      handleSubmit,
      sortHandleChange,
      checkedSortHandleChange,
      handleOrder,
      options,
      items,
      removeButton,
      removeAllFilter,
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
