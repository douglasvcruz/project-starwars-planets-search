import { useState } from 'react';

function useHandleChange(e) {
  const [value, setValue] = useState(e);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  return { value, onChange: handleChange, setValue };
}

export default useHandleChange;
