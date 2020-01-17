import React from 'react';
import CalcBut from './calcBut.js';

export default function CalcSign(props) {
  let {sign, signBut, calculate, signAction} = props;
  return (
    <div className="col-xs-3">
      {
        sign.map((e, i) => {
          if(e=='=') {
              return <CalcBut classN={signBut} val={e} key={i} evnt={calculate} text={e} />
          }
          return <CalcBut classN={signBut} val={e} key={i} evnt={signAction} text={e} />
        })
      }
    </div>
  )
}
