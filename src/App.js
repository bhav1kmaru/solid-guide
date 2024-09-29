import React, { useState, useEffect, useRef } from 'react';
import ellipse from './assets/ellipse.svg';
import './App.css';
import FunctionCard from './components/FunctionCard';
import { drawLineBetweenPoints } from './utils/drawLines';  // Import the utility function

function App() {
  const [initialValue, setInitialValue] = useState(2);
  const [finalOutput, setFinalOutput] = useState(0);

  const [equation1, setEquation1] = useState('x*x');
  const [output1, setOutput1] = useState(0);

  const [equation2, setEquation2] = useState('2x+4');
  const [output2, setOutput2] = useState(0);

  const [equation4, setEquation4] = useState('x-2');
  const [output4, setOutput4] = useState(0);

  const [equation5, setEquation5] = useState('x/2');
  const [output5, setOutput5] = useState(0);

  const [equation3, setEquation3] = useState('x^2+20');
  const [output3, setOutput3] = useState(0);

  const function1Ref = useRef(null);
  const function2Ref = useRef(null);
  const function3Ref = useRef(null);
  const function4Ref = useRef(null);
  const function5Ref = useRef(null);
  const initialValueRef = useRef(null);
  const finalOutputRef = useRef(null);

  const calculateOutput = () => {
    try {
      const processEquation = (equation, xValue) => {
        let processedEquation = equation.replace(/(\d)(x)/g, '$1*$2');
        processedEquation = processedEquation.replace(/\^/g, '**');
        processedEquation = processedEquation.replace(/x/g, xValue);
        return eval(processedEquation);
      };

      const y1 = processEquation(equation1, initialValue);
      setOutput1(y1);

      const y2 = processEquation(equation2, y1);
      setOutput2(y2);

      const y4 = processEquation(equation4, y2);
      setOutput4(y4);

      const y5 = processEquation(equation5, y4);
      setOutput5(y5);

      const y3 = processEquation(equation3, y5);
      setOutput3(y3);

      setFinalOutput(y3);
    } catch (error) {
      console.error("Invalid equation", error);
    }
  };

  useEffect(() => {
    calculateOutput();
  }, [initialValue, equation1, equation2, equation4, equation5, equation3]);

  useEffect(() => {
    const updateLines = () => {
      const initialValueElement = initialValueRef.current;
      const function1Element = function1Ref.current;
      const function2Element = function2Ref.current;
      const function3Element = function3Ref.current;
      const function4Element = function4Ref.current;
      const function5Element = function5Ref.current;
      const finalOutputElement = finalOutputRef.current;

      if (!initialValueElement || !function1Element || !function2Element || !function3Element || !function4Element || !function5Element || !finalOutputElement) {
        return;
      }

      const getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return { left: rect.left + window.pageXOffset, top: rect.top + window.pageYOffset };
      };

      const posInitialValue = getOffset(initialValueElement);
      const posFunction1 = getOffset(function1Element);
      const posFunction2 = getOffset(function2Element);
      const posFunction3 = getOffset(function3Element);
      const posFunction4 = getOffset(function4Element);
      const posFunction5 = getOffset(function5Element);
      const posFinalOutput = getOffset(finalOutputElement);

      document.querySelectorAll('.line').forEach(line => line.remove());

      drawLineBetweenPoints(
        posInitialValue.left + initialValueElement.offsetWidth,
        posInitialValue.top + initialValueElement.offsetHeight / 2,
        posFunction1.left,
        posFunction1.top + function1Element.offsetHeight / 2
      );

      drawLineBetweenPoints(
        posFunction1.left + function1Element.offsetWidth,
        posFunction1.top + function1Element.offsetHeight / 2,
        posFunction2.left,
        posFunction2.top + function2Element.offsetHeight / 2
      );

      drawLineBetweenPoints(
        posFunction2.left + function2Element.offsetWidth,
        posFunction2.top + function2Element.offsetHeight / 2,
        posFunction4.left,
        posFunction4.top + function4Element.offsetHeight / 2
      );

      drawLineBetweenPoints(
        posFunction4.left + function4Element.offsetWidth,
        posFunction4.top + function4Element.offsetHeight / 2,
        posFunction5.left,
        posFunction5.top + function5Element.offsetHeight / 2
      );

      drawLineBetweenPoints(
        posFunction5.left + function5Element.offsetWidth,
        posFunction5.top + function5Element.offsetHeight / 2,
        posFinalOutput.left,
        posFinalOutput.top + finalOutputElement.offsetHeight / 2
      );
    };

    window.addEventListener('resize', updateLines);
    updateLines();

    return () => {
      window.removeEventListener('resize', updateLines);
    };
  }, []);

  return (
    <div className="app">
      <div className="main-container">
        <div className="initial-value-container" ref={initialValueRef}>
          <div className="initial-value-label-container">
            <span className="initial-value-label">Initial value of x</span>
            <div className='x-input-container'>
              <input
                type='number'
                value={initialValue}
                onChange={(e) => setInitialValue(parseFloat(e.target.value))}
              />
              <img src={ellipse} alt="ellipse" />
            </div>
          </div>
          <FunctionCard
            label='Function: 1'
            equation={equation1}
            setEquation={setEquation1}
            output={output1}
            setOutput={setOutput1}
            disabled={true}
            nextFunction={"Function 2"}
            ref={function1Ref}
          />
        </div>
        <FunctionCard
          label='Function: 2'
          equation={equation2}
          setEquation={setEquation2}
          output={output2}
          setOutput={setOutput2}
          disabled={true}
          nextFunction={"Function 4"}
          ref={function2Ref}
        />
        <div className="final-output-wrapper">
          <FunctionCard
            label='Function: 3'
            equation={equation3}
            setEquation={setEquation3}
            output={output3}
            setOutput={setOutput3}
            disabled={true}
            nextFunction={"-"}
            ref={function3Ref}
          />
          <div className="final-output-container" ref={finalOutputRef}>
            <span className="final-output-label">Final Output y</span>
            <div className='y-input-container'>
              <img src={ellipse} alt="ellipse" />
              <input type='number' disabled value={finalOutput} />
            </div>
          </div>
        </div>
      </div>

      <div className="function-card-row">
        <FunctionCard
          label='Function: 4'
          equation={equation4}
          setEquation={setEquation4}
          output={output4}
          setOutput={setOutput4}
          disabled={true}
          nextFunction={"Function 5"}
          ref={function4Ref}
        />
        <FunctionCard
          label='Function: 5'
          equation={equation5}
          setEquation={setEquation5}
          output={output5}
          setOutput={setOutput5}
          disabled={true}
          nextFunction={"Function 3"}
          ref={function5Ref}
        />
      </div>
    </div>
  );
}

export default App;
