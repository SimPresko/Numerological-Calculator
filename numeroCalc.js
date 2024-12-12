let destinationNumber;
let maleNumbers =0;
let femaleNumbers =0;

const calcBt = document.querySelector('.js-calc');
calcBt.addEventListener('click',()=>{
  const arr = calculateMatrix();
  fillMatrix(arr);
})

const clearBt = document.querySelector('.js-clear');
clearBt.addEventListener('click',()=>{
  clearMatrix();
})

//Overall calculation
function calculateMatrix(){
  clearMatrix();
  const date = document.querySelector('.js-input-date').value;
  if(checkValidDate(date)){
    alert('Please enter a valid date');
    return;
  } 
  const before2000 = date<'2000-01-01';
  let numbersArr = makeAnArray(date);
  let firstSum;
  numbersArr, firstSum = moreCalculations(numbersArr);
  numbersArr = finalCalculations(numbersArr,before2000, firstSum);
  return numbersArr;
}

export function checkValidDate(date){
  if(!date) return true;
}

//filling the html matrix
function fillMatrix(arr){
  maleNumbers = 0;
  femaleNumbers = 0;
  for(let i=0;i<arr.length;i++){
    if(arr[i]===0){ 
      continue;
    }
    if(arr[i]%2===0){
      maleNumbers++;
    } else {
      femaleNumbers++;
    }
    const field = document.querySelector(`.js-${arr[i]}s`);
    if(field.innerHTML==='-') field.innerHTML = ''
    field.innerHTML+=`${arr[i]}`
  }
}


//Converting the data into an integer array

function makeAnArray(text){
  let numbersArr =[];
  for(let i=0;i<text.length;i++){
    if(text[i]==='-') continue;
    numbersArr.push(Number(text[i]));
  }
  return numbersArr;
}

//Last calculations

function finalCalculations(arr, before2000, firstSum){
  const addedValue = before2000 ? -2 : 19
  before2000 ? arr.push(2) : arr.push(1,9);
  const secondSum = firstSum + addedValue;
  if(secondSum<10) {
    arr.push(secondSum)
  } else{
      arr.push(Math.floor(secondSum/10));
      arr.push(secondSum-10*Math.floor(secondSum/10))
      const reducedNum = singleReduce(secondSum);
      arr.push(Math.floor(reducedNum/10));
      arr.push(reducedNum-10*Math.floor(reducedNum/10));
    }
  return arr

}

//Calculating the first sum

export function getNumValues(){
  return {destinationNumber,maleNumbers,femaleNumbers};
}

function moreCalculations(arr){
  let sum = 0;
  arr.forEach((number) => {
    sum+=number;
  });
  
  destinationNumber = fullReduce(sum);

  if(sum<10) {
    arr.push(sum)
  } else{
      arr.push(Math.floor(sum/10));
      arr.push(sum-10*Math.floor(sum/10))
      const reducedNum = singleReduce(sum);
      arr.push(Math.floor(reducedNum/10));
      arr.push(reducedNum-10*Math.floor(reducedNum/10));
    }
  return arr, sum;
}

//Formulas for reduction

function singleReduce(number){
  const reducedNumber = Math.floor(number/10)+number-10*Math.floor(number/10);
  return reducedNumber;
}

function fullReduce(number){
  let reducedNumber = singleReduce(number);
  if(reducedNumber>=10) {
    reducedNumber = singleReduce(reducedNumber)
    return reducedNumber
  } else return reducedNumber
}

//clearing the matrix

function clearMatrix(){
  for(let i=1;i<=9;i++){
    document.querySelector(`.js-${i}s`).innerHTML = '-';
  }
}