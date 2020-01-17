import React from 'react';

export default function CalcBut(props) {
  let {classN, val, evnt, text, transfer} = props;
  if(transfer) {
    var tEvent = function() {
      evnt(transfer);
    }
  }
  return (
    <button className={classN} value={val} onClick={transfer?tEvent:evnt}>{text}</button>
  )
}