import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import data from '../mock/data';
import App from '../App';
import TableProvider from '../context/TableProvider';

beforeEach(async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  });
  await act(async () => {
    render(
      <TableProvider>
        <App />
      </TableProvider>,
    );
  });
});

test('Testando os eventos', async () => {
  expect(fetch).toHaveBeenCalled();
  const nameFilter = screen.getByTestId('name-filter');
  await act(async () => {
    userEvent.type(nameFilter, 'Tatooine');
  });
  const tatooine = await screen.findByRole('cell', { name: /tatooine/i });
  expect(tatooine).toBeInTheDocument();

  const columnFilter = screen.getByTestId(/column-filter/i);
  const comparisonFilter = screen.getByTestId(/comparison-filter/i);
  const valueFilter = screen.getByTestId(/value-filter/i);
  const filter = screen.getByRole('button', {
    name: /filtrar/i,
  });
  await act(async () => {
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '6000000');
    userEvent.click(filter);
  });
  const alderaan = await screen.findByRole('cell', { name: /alderaan/i });
  expect(alderaan).toBeInTheDocument();
  const ascendente = screen.getByText(/ascendente/i);
  const ordenar = screen.getByRole('button', {
    name: /ordenar/i,
  });
  await act(async () => {
    userEvent.click(ascendente);
    userEvent.click(ordenar);
  });
});

test('Testando os eventos 2', async () => {
  const columnFilter = screen.getByTestId(/column-filter/i);
  const comparisonFilter = screen.getByTestId(/comparison-filter/i);
  const valueFilter = screen.getByTestId(/value-filter/i);
  const filter = screen.getByRole('button', {
    name: /filtrar/i,
  });
  await act(async () => {
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '6000000');
    userEvent.click(filter);
  });
});

test('Testando os eventos 3', async () => {
  const columnFilter = screen.getByTestId(/column-filter/i);
  const comparisonFilter = screen.getByTestId(/comparison-filter/i);
  const valueFilter = screen.getByTestId(/value-filter/i);
  const filter = screen.getByRole('button', {
    name: /filtrar/i,
  });
  await act(async () => {
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '6000000');
    userEvent.click(filter);
  });
  const remove = await screen.findByRole('button', {
    name: /x/i,
  });
  const removeAll = screen.getByRole('button', {
    name: /remover todas as filtragens/i,
  });
  await act(async () => {
    userEvent.click(remove);
    userEvent.click(removeAll);
  });
});
