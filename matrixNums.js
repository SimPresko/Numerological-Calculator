import { checkValidDate, getNumValues } from "./numeroCalc.js";

const destNum = document.querySelector('.js-destination-number');
const maleNum = document.querySelector('.js-male-numbers');
const femaleNum = document.querySelector('.js-female-numbers');

const calcBt = document.querySelector('.js-calc');
calcBt.addEventListener('click',()=>{
  const date = document.querySelector('.js-input-date').value;
  if(checkValidDate(date)) return;
  let valueNums = getNumValues();
  console.log(valueNums);
  destNum.innerHTML = `Number of destination: ${valueNums.destinationNumber}`;
  maleNum.innerHTML = `Masculine number count: ${valueNums.maleNumbers}`;
  femaleNum.innerHTML = `Feminine number count: ${valueNums.femaleNumbers}`;
});
const clearBt = document.querySelector('.js-clear');
clearBt.addEventListener('click',()=>{
  destNum.innerHTML = 'Number of destination:';
  maleNum.innerHTML = 'Masculine number count:';
  femaleNum.innerHTML = 'Feminine number count:';
})