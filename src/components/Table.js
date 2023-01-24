import { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { dataFilter } = useContext(TableContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { dataFilter.map((a, i) => (
          <tr key={ i }>
            <td>{a.name}</td>
            <td>{a.rotation_period}</td>
            <td>{a.orbital_period}</td>
            <td>{a.diameter}</td>
            <td>{a.climate}</td>
            <td>{a.gravity}</td>
            <td>{a.terrain}</td>
            <td>{a.surface_water}</td>
            <td>{a.population}</td>
            <td>{a.films.map((b, index) => <p key={ index }>{b}</p>)}</td>
            <td>{a.created}</td>
            <td>{a.edited}</td>
            <td>{a.url}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
