import React from 'react';
import CalcBut from './calcBut.js';

export default function ValuteTranslate(props) {
  let {valutes, classN, convRub, convValute} = props;
  if(valutes.length>0) {
    return (
      <div className="col-xs-12 cursM">
        {
          valutes.map((el, count)=> {
            let transRunText = 'Перевести из рублей в "'+el.valuteName+'"';
            let transValText = 'Перевести из "'+el.valuteName+'" в рубли';
            return <div className=" btn-valute" key={count}>
              {<CalcBut classN = {classN} evnt = { convRub} transfer = {el.curs} text = { transRunText } />}
              {<CalcBut classN = {classN} evnt = {convValute} transfer = {el.curs} text = { transValText } />}
            </div>
          })
        }
      </div>
    )
  } else {
    return '';
  }
}