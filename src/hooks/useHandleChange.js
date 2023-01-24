import { useState } from 'react';

function useHandleChange() {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return { value, onChange: handleChange };
}

export default useHandleChange;
