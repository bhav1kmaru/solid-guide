import React, { forwardRef } from 'react';
import dots from '../assets/dots.svg';
import ellipse from '../assets/ellipse.svg';

const FunctionCard = forwardRef(({ label, equation, setEquation, output, setOutput, disabled, nextFunction }, ref) => {

  const handleInputChange = (e) => {
    let value = e.target.value;

    const validRegexForEquation = /^[0-9x\+\-\*\/\^ ]*$/;
    if (!validRegexForEquation.test(value)) {
      setOutput('Invalid characters');
      return;
    }

    setEquation(value);
  };

  return (
    <div className="function-card" ref={ref}>
      <span>
        <img src={dots} alt="dots" />
      </span>
      <span className="function-label">{label}</span>
      <div className="function-card-input">
        <label>Equation</label><br />
        <input value={equation} onChange={handleInputChange} />
      </div>
      <div className="function-card-input">
        <label>Next function</label><br />
        <select className='select-arrow' disabled={disabled}>
          <option>{nextFunction}</option>
        </select>
      </div>
      <div className="input-output-icons">
        <div className="input-icon">
          <img src={ellipse} alt="ellipse" />
          <span>input</span>
        </div>
        <div className="output-icon">
          <span>output</span>
          <img src={ellipse} alt="ellipse" />
        </div>
      </div>
    </div>
  );
});

export default FunctionCard;
