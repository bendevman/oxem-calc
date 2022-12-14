import './calc.scss'

import '../sliders/sliders'
import '../info-boxes/info-boxes'
import '../btn/btn'

const sliders = document.querySelectorAll('.slider'),
      totalPay = document.querySelector('[name="totalPay"]'),
      monthPay = document.querySelector('[name="monthPay"]'),
      initial = document.querySelector('[name="initial"]'),
      initialPersent = document.querySelector('[name="initial-range"]'),
      price = document.querySelector('[name="price"]'),
      months = document.querySelector('[name="months"]'),
      btn = document.querySelector('[name="sub"]')

let data = {
  car_coast: price.value,
  initail_payment: initial.value,
  initail_payment_percent: initialPersent.value,
  lease_term: months.value,
  total_sum: totalPay.value,
  monthly_payment_from: monthPay.value
} 
/////////////////////////////////////////
function SetRangeColor(rangeInput){
  let thumLocation = (rangeInput.value - rangeInput.getAttribute('min')) * 100 / (rangeInput.getAttribute('max')- rangeInput.getAttribute('min'))
  rangeInput.style.background = `linear-gradient(90deg, #FF9514 ${thumLocation}%, #E1E1E1 ${thumLocation}%)` 
}
function ruCurrency(value){
  return new Intl.NumberFormat('ru-RU', { 
    style: 'currency',
    maximumFractionDigits: 0,
    currency: 'RUB' }).format(value)
}
function initialPayment(){
  const initialValue = (initialPersent.value/100)*price.value
  return Math.round(initialValue)
}
function monthPayment(){
  const monthCost = (price.value - initial.value) *
   ((0.035 * Math.pow((1 + 0.035), months.value)) / 
   (Math.pow((1 + 0.035), months.value) - 1))
  return Math.round(monthCost)
}
function totalPayment(initalPayment,months,monthPayment){
  return initalPayment + months * monthPayment
}

async function send(data) {
  try {
    fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
      }).then(res =>{
        console.log(res.json())
      })
  } catch (error) {
    console.log('error:'+ error) 
    
  }
  
}
///////////////////////////////////////////
initial.value = initialPayment()
monthPay.value = ruCurrency(monthPayment())
totalPay.value = ruCurrency(totalPayment(initialPayment(),months.value,monthPayment()))

sliders.forEach(el => {
  let numInput = el.querySelector('.slider__input-number'),
      rangeInput = el.querySelector('.slider__input-range'),
      info = el.querySelector('.slider__info'),
      foo = (rangeInput.value - rangeInput.getAttribute('min')) * 100 / (rangeInput.getAttribute('max')- rangeInput.getAttribute('min'))
  
  SetRangeColor(rangeInput)
  rangeInput.style.background = `linear-gradient(90deg, #FF9514 ${foo}%, #E1E1E1 ${foo}%)`      
  numInput.addEventListener('input',()=>{
    rangeInput.value=numInput.value 
    monthPay.value = rangeInput.value
    // console.log(numInput.value, rangeInput.value)
    SetRangeColor(rangeInput)

  })
  rangeInput.addEventListener('input',()=>{
    if (info.classList.contains('slider__info-box')) {
      info.innerText = rangeInput.value + '%'
      // console.log(initialPersent.value)
    }else{
      numInput.value = rangeInput.value
    }
    
    initial.value = initialPayment()
    monthPay.value = ruCurrency(monthPayment())
    totalPay.value = ruCurrency(totalPayment(initialPayment(),months.value,monthPayment()))
    // console.log(numInput.value, rangeInput.value)
    data = {
      car_coast: price.value,
      initail_payment: initial.value,
      initail_payment_percent: initialPersent.value,
      lease_term: months.value,
      total_sum: totalPay.value,
      monthly_payment_from: monthPay.value
    }
    SetRangeColor(rangeInput)
  })
});

btn.addEventListener('click',(e)=>{
  e.preventDefault()
  send(data)
})









