import React from 'react';

export default function CursList(props) {
  let {valutes} = props;
  
  if(valutes.length) {
    return  <div className="col-xs-12 valutes-list">
      {
        valutes.map(function(el, count) {
          return (
            <div className="col-xs-12" key={count}>
              На <b>{el.cursDate}</b> за {el.valuteName} вы можете получить <b>{el.curs}</b> руб.
            </div>
          )
        })
      }
    </div>
  } else {
    return <div className="col-xs-12 valutes-list">Не удается получить доступ к серверу</div>;
  }
}