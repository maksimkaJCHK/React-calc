import React from 'react';

export default function CalcInput(props) {
  let {actionExp, actionSign, calcValVis} = props;
  return (
    <div className="col-xs-12">
      <div className="form-control">
        <div className="action">{actionExp} {actionSign}</div>
        {calcValVis}
      </div>
    </div>
  )
}