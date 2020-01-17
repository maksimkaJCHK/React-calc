import React from 'react';
import CalcBut from './calcBut.js';

export default function CalcNumbers(props) {
  let {servicesF, number, servBut, delNumb, reset, changeSign, numberButBig, numberBut, writeNum} = props;
  return (
    <div className="col-xs-9">
      {
        servicesF.map((e,i) => {
          switch (e) {
            case '←':
              return <CalcBut classN={servBut} val={e} key={i} evnt={delNumb} text={e} />;
              break;
            case 'C':
              return <CalcBut classN={servBut} val={e} key={i} evnt={reset} text={e} />;
              break;
            case '±':
              return <CalcBut classN={servBut} val={e} key={i} evnt={changeSign} text={e} />;
              break;
          }
        })
      }
      {
        number.map((e, i)=>{
          if(e=='0') {
            return <CalcBut classN={numberButBig} val={e} key={i} evnt={writeNum} text={e} />
          }
          return <CalcBut classN={numberBut} val={e} key={i} evnt={writeNum} text={e} />
        })
      }
    </div>
  )
}