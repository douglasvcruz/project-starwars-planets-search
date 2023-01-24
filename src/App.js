import './App.css';
import React from 'react';
import Table from './components/Table';
import TableProvider from './context/TableProvider';
import Filters from './components/Filters';

function App() {
  return (
    <TableProvider>
      <Filters />
      <Table />
    </TableProvider>
  );
}

export default App;
