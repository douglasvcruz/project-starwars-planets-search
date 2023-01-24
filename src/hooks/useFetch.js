import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((dat) => setData(dat.results.filter((a) => delete a.residents)))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { loading, error, data, refresh };
}

export default useFetch;
