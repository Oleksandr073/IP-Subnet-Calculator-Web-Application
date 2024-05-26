import { useState } from 'react';

import {
  AdvancedCalculatorFormData,
  AdvancedIPCalculatorForm,
} from './AdvancedIPCalculatorForm';

export const AdvancedSubnetting = () => {
  const [result, setResult] = useState('');

  const onSubmitHandler = (data: AdvancedCalculatorFormData) => {
    setResult(String(Date.now()) + JSON.stringify(data));
  };

  return (
    <div>
      <div className="mb-3">
        <AdvancedIPCalculatorForm onSubmit={onSubmitHandler} />
      </div>

      {result && <p>{result}</p>}
    </div>
  );
};
