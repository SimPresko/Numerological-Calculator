import { checkValidDate } from "./numeroCalc.js";

const calcBt = document.querySelector('.js-calc');
calcBt.addEventListener('click',()=>{
  clearLinearChart();
  const date = document.querySelector('.js-input-date').value;
  if(checkValidDate(date)) return;
  document.querySelector('.graph').style.border = '2px solid lightgray';
  let editedDate = '';
  for(let i = 0;i<10;i++){
    editedDate += date[i] === '0'? '1' : date[i];
  }
  let vars = {};
  vars = getDate(date);
  let editedVars = {};
  editedVars = getDate(editedDate);

  let lineOfFaith = calculateLine(vars.daymonth,vars.year);
  let lineOfWill = calculateLine(editedVars.daymonth, editedVars.year);

  let data = createData(lineOfFaith,lineOfWill);
  createLinearChart(data);
})


const clearBt = document.querySelector('.js-clear');
clearBt.addEventListener('click',()=>{
  clearLinearChart();
})

function getDate(date){
  let year = date[0] + date[1] + date[2] + date[3];
  let month = date[5]+date[6];
  let day = date[8]+date[9];
  let daymonth = day+month;
  let vars = {daymonth,year};
  return vars;
}

function calculateLine(daymonth,year){
  let line = daymonth*year;
  if(line<1000000){
    line = '0'+ line;
  }
  return String(line);
}

function createData(lineOfFaith,lineOfWill){
  let data = [
    [0,Number(lineOfFaith[0]),Number(lineOfWill[0])],
    [12,Number(lineOfFaith[1]),Number(lineOfWill[1])],
    [24,Number(lineOfFaith[2]),Number(lineOfWill[2])],
    [36,Number(lineOfFaith[3]),Number(lineOfWill[3])],
    [48,Number(lineOfFaith[4]),Number(lineOfWill[4])],
    [60,Number(lineOfFaith[5]),Number(lineOfWill[5])],
    [72,Number(lineOfFaith[6]),Number(lineOfWill[6])],
    [84,Number(lineOfFaith[0]),Number(lineOfWill[0])],
    [96,Number(lineOfFaith[1]),Number(lineOfWill[1])],
    [108,Number(lineOfFaith[2]),Number(lineOfWill[2])]
  ]
  return data;
}

function createLinearChart(data){
  const dataSet = anychart.data.set(data);

  const firstSeriesData = dataSet.mapAs({x:0, value: 1});
  const secondSeriesData = dataSet.mapAs({x:0, value: 2});

  const chart = anychart.line();

  chart.xGrid().enabled(true);
  chart.yGrid().enabled(true);

  chart.yScale(anychart.scales.linear()); 
  chart.xScale(anychart.scales.linear());

  chart.yScale().ticks().interval(1);
  chart.xScale().ticks().interval(12);
  chart.xScale().minimum(0);
  chart.xScale().maximum(108);
  chart.yScale().minimum(0);
  chart.yScale().maximum(9);
  chart.yAxis().labels().format(function(){
    var valueText = this.value;
    return valueText;  
  })

  const firstSeries = chart.line(firstSeriesData);
  firstSeries.name('Line of will');
  firstSeries.normal().stroke('#0000FF',2.5);
  const secondSeries = chart.line(secondSeriesData);
  secondSeries.name('Line of fate'); 
  secondSeries.normal().stroke('#FF0000',2.5);
  
  chart.legend().enabled(true);

  chart.title('Graph');

  chart.container('graph');
  chart.draw();
};

function clearLinearChart(){
  document.querySelector('.graph').innerHTML = '';
  
  document.querySelector('.graph').style.border = 'none';
}