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

/////////////////////////////////////////
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
  
  console.log('sum') 
  return initalPayment + months * monthPayment
}
///////////////////////////////////////////
initial.value = initialPayment()
monthPay.value = ruCurrency(monthPayment())
totalPay.value = ruCurrency(totalPayment(initialPayment(),months.value,monthPayment()))

sliders.forEach(el => {
  let numInput = el.querySelector('.slider__input-number'),
      rangeInput = el.querySelector('.slider__input-range'),
      info = el.querySelector('.slider__info')

  numInput.addEventListener('input',()=>{
    rangeInput.value=numInput.value 
    monthPay.value = rangeInput.value
    // console.log(numInput.value, rangeInput.value)
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
  })
});

btn.addEventListener('click',(e)=>{
  e.preventDefault()
})









