import React, {Component} from 'react';
import superagent from 'superagent';
import {render} from 'react-dom';
import {setCookie, getCookie} from './services_modules/cookies.js';
import CursList from "./components/CursList.js";
import CalcInput from './components/calcInput.js'
import CalcNumbers from './components/calcNumbers.js';
import CalcSign from './components/calcSign.js';
import ValuteTranslateBut from './components/valuteTranslate.js';
import './css/buttons.scss';
import './css/calc.scss';

export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calcVal: '0',
      calcValVis: '0',
      actionExp: '',
      actionSign: '',
      cursDate: '',
      curs: '',
      servicesF: ['←','C','±'],
      number: ['1','2','3','4','5','6','7','8','9','0','.'],
      sign: ['+','-','*','/','='],
      valutes: []
    };
    this.writeCookie = this.writeCookie.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.signAction = this.signAction.bind(this);
    this.writeNum = this.writeNum.bind(this);
    this.delNumb = this.delNumb.bind(this);
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
    this.convRub = this.convRub.bind(this);
    this.convValute = this.convValute.bind(this);
    // Полифилл для IE
    Number.isInteger = Number.isInteger || function(value) {
      return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
    };
  }
  componentDidUpdate() {
    this.writeCookie();
  }
  componentWillMount() {
    let actionExp = '';
    let actionSign = '';
    let calcValVis = '0';
    var calcVal  = '0';
    if(getCookie("actionExp")) {
      actionExp = getCookie("actionExp");
    }
    if(getCookie("actionSign")) {
      actionSign = getCookie("actionSign");
    }
    if(getCookie("calcValVis")) {
      calcValVis = getCookie("calcValVis");
    }
    if(getCookie("calcVal")) {
      calcVal = getCookie("calcVal");
    }
    
    this.setState({
      actionExp: actionExp,
      actionSign: actionSign,
      calcValVis: calcValVis,
      calcVal: calcVal
    });

    let self = this;

    superagent
    .get('https://www.cbr-xml-daily.ru/daily_json.js')
    .send()
    .set('accept', 'json')
    .end((err, res) => {
      if(err==null) {
        let resp = JSON.parse(res.text);
        let time = new Date(resp.Timestamp);
        let year = time.getFullYear();
        let month = time.getMonth();
        let date = time.getDate();
        self.setState({
          valutes: [
            {
              cursDate: date+'.'+month+1+'.'+year,
              curs: resp.Valute.USD.Value.toFixed(2),
              valuteName: resp.Valute.USD.Name
            },
            {
              cursDate: date+'.'+month+1+'.'+year,
              curs: resp.Valute.EUR.Value.toFixed(2),
              valuteName: resp.Valute.EUR.Name
            }
          ]
        });
      }
    });
  }
  writeCookie() {
    let {actionExp, actionSign, calcValVis, calcVal} = this.state;
    setCookie("actionExp", actionExp, {
      expires: 1209600
    });
    setCookie("actionSign", actionSign, {
      expires: 1209600
    });
    setCookie("calcValVis", calcValVis, {
      expires: 1209600
    });
    setCookie("calcVal", calcVal, {
      expires: 1209600
    });
  }
  changeSign() {
    let calcValVis = this.state.calcValVis;
    let numb = Number(calcValVis);
    if(numb<0) {
      calcValVis = Math.abs(numb);
    } else {
      calcValVis = '-'+calcValVis;
    }
    this.setState({
      calcValVis: calcValVis,
      calcVal: calcValVis
    });
  }
  signAction(e) {
    let action = e.target.value;
    let actionSign = this.state.actionSign;
    if(action == actionSign) {
      this.calculate();
    } else if (actionSign=='') {
      this.setState({
        actionExp: this.state.calcValVis,
        actionSign: action,
        calcVal: '0'
      });
    } else {
      this.setState({
        actionSign: action,
      });
    }
  }
  writeNum(e) {
    let inpVal = e.target.value;
    let calcValVis = this.state.calcVal;
    if(calcValVis != 0) {
      calcValVis += inpVal;
    } else {
      calcValVis = inpVal;
    }
    this.setState({
      calcValVis: calcValVis,
      calcVal: calcValVis
    });
  }
  delNumb() {
    let calcValVis = this.state.calcValVis;
    if(calcValVis.length>1) {
      calcValVis = calcValVis.substr(0, calcValVis.length-1);
      if(calcValVis=='-') {
        calcValVis = 0;
      }
    } else {
      calcValVis = 0;
    }
    this.setState({
      calcValVis: calcValVis,
      calcVal: calcValVis
    });
  }
  reset() {
    this.setState({
      calcVal: '0',
      calcValVis: '0',
      actionExp: '',
      actionSign: '',
    });
  }
  calculate() {
    let {actionExp, actionSign, calcValVis} = this.state;
    let counting;

    if(actionSign=="-" && calcValVis<0) {
      counting = eval(actionExp+''+'+'+Math.abs(calcValVis));
    } else {
      counting = eval(actionExp+''+actionSign+''+calcValVis);
    }

    this.setState({
      calcVal: '0',
      calcValVis: counting,
      actionExp: '',
      actionSign: '',
    });
  }
  convRub(x) {
    let curs = x;
    let inpVal = this.state.calcVal;
    let conversion = inpVal/curs;
    if(!Number.isInteger(conversion)) {
      conversion = conversion.toFixed(2);
    }
    this.setState({
      calcVal: '0',
      calcValVis: conversion,
      actionExp: '',
      actionSign: '',
    });
  }
  convValute(x) {
    let curs = x;
    let inpVal = this.state.calcVal;
    let conversion = inpVal*curs;
    if(!Number.isInteger(conversion)) {
      conversion = conversion.toFixed(2);
    }
    this.setState({
      calcVal: '0',
      calcValVis: conversion,
      actionExp: '',
      actionSign: '',
    });
  }
  render() {
    let writeNum = this.writeNum;
    let signAction = this.signAction;
    let calculate = this.calculate;
    let delNumb = this.delNumb;
    let reset = this.reset;
    let changeSign = this.changeSign;
    let convRub = this.convRub;
    let convValute = this.convValute;
    let numberBut = 'btn btn-default col-xs-4';
    let numberButBig = 'btn btn-default col-xs-8';
    let servBut = 'btn btn-top-services col-xs-4';
    let signBut = 'btn btn-services col-xs-12';
    let cursBut = 'btn btn-valute-translate col-xs-12';

    let {actionExp, actionSign, calcValVis, valutes, servicesF, number, sign} = this.state;

    return (
      <div id="calc" className="calc">
        <CursList valutes={valutes} />
        <CalcInput actionExp = {actionExp} actionSign = {actionSign} calcValVis = {calcValVis} />
        <CalcNumbers number = {number} servicesF = {servicesF} servBut = {servBut} delNumb = {delNumb} reset = {reset} changeSign = {changeSign} numberButBig = {numberButBig} numberBut = {numberBut} writeNum = {writeNum} />
        <CalcSign sign={sign} signBut={signBut} calculate={calculate} signAction={signAction} />
        <ValuteTranslateBut valutes = {valutes} classN = {cursBut} convRub = {convRub} convValute = {convValute}  />
      </div>
    )
  }
}

render(
  <Calc />,
  document.getElementById('app')
)