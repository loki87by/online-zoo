// ***imports
import { SLIDES, FAVORITES, TESTIMONIALS, PAGES } from "./consts.js";

// ***consts
const slider = document.getElementById('slider');
const container = document.getElementById('favorites');
const testims = document.getElementById('testims');
const viewPanda = document.getElementById('view-panda');
const petsButton = document.getElementById('pets-button');
const mainPopup = document.getElementById('main-popup');
const donateButton = document.getElementById('donate-button');
const secondDonateButton = document.querySelector('.testimonials__main-btn_footer');
const quickDonateButton = document.querySelector('.donate__form-btn');
const mobileDonateButton = document.querySelector('.pay__mobile-form-btn');
const closePopupButton = document.getElementById('popup__close');
const priceButtons = mainPopup.querySelectorAll('button');
const firstDonatePopup = document.getElementById('donate-popup');
const rates = document.getElementById('rates');
const donateInput = rates.querySelector('.donate-amount__rate_input');
const donatePets = document.getElementById('donate-to-pet');
const donateSubmit = document.querySelector('.donate__submit');
const donateBack = document.querySelector('.donate__back');
const petsMainBtns = document.querySelectorAll('.pets__main-btn');
const petsSlider = document.querySelector('.pets__slider');
const petsSliderBtns = document.querySelectorAll('.pets__slider-btn');
const testimSliderBtns = document.querySelectorAll('.testimonials__item-btn');
const firstNumberInput = document.forms[0].querySelector('input');
const secondNumberInput = document.forms[1].querySelector('input');
const thirdNumberInput = document.forms[3].querySelector('.donate-amount__card-input');
const fourdNumberInput = document.forms[3].querySelector('.donate-amount__cvv-input');
const mobileMenuButton = document.querySelector('.header__mobile-button');
const mobileTestimSlider = document.querySelector('.testimonials__mobile-slider');
const mobileSlider = document.querySelector('.favourites__mobile-slider');
const mobileTestimSliderBtns = document.querySelectorAll('.testimonials__mobile-slider-circle');
const mobileSliderBtns = document.querySelectorAll('.favourites__mobile-slider-circle');
const titles = ['Donation Information:', 'Billing Information:', 'Payment Information:'];
let testimonialsDirection = () => testimSlider('left');
let startInterval = setInterval(testimonialsDirection, 15000);
let testimItems = TESTIMONIALS;
let donateData = {};
let step = 0;
let mobileTestimSlideStep = 0;
let mobileSlideStep = 0;
let petsSliderCounter = 0;
let direct = 'left';
let donateThanks = '';
let noSymbolsValue;
let priceValue;

// ***functional
// **inputs
function inputLimiter(event, max){
  if ((event.data === '+') || (event.data === '-') || (event.data === '.') || (event.data === ',') || (event.data === 'e')) {
    event.target.value = noSymbolsValue;
  } else {
    noSymbolsValue = event.target.value;
  };
  priceValue = `$${event.target.value}`;
  if (event.target.value.length > max) {
    let maxValue = event.target.value.split('').slice(0, max).join('');
    event.target.value = maxValue;
    priceValue = `$${maxValue}`;
  };
};
function donateValidation() {
  let thanx = [];
  let valid = [];
  if (donateData.name) {
    thanx.push(`Thank you, dear ${donateData.name}, `);
    valid.push(true);
  } else {
    valid.push(false);
  };
  if (donateData.price) {
    const data = donateData.price.replace(/\D/g, '');
    if(data !== 0) {
      thanx.push(`for you ${data}$ `);
      valid.push(true);
    } else {
      valid.push(false);
    };
  } else {
    valid.push(false);
  };
  if (donateData.email) {
    valid.push(true);
  } else {
    valid.push(false);
  };
  if (donateData.numb) {
    const num = (donateData.numb + '').split('').map((item, index) => {
      if (index < 12) {
        return '*';
      } else {
        return item;
      };
    }).join('');
    thanx.push(`from card: ${num}`);
    valid.push(true);
  } else {
    valid.push(false);
  };
  if (donateData.pet) {
    thanx.push(`, for ${donateData.pet}`);
  };
  if (donateData.cvv) {
    valid.push(true);
  } else {
    valid.push(false);
  };
  if (donateData.month) {
    valid.push(true);
  } else {
    valid.push(false);
  };
  if (donateData.year) {
    valid.push(true);
  } else {
    valid.push(false);
  };
  const validation = valid.every((item) => { return item === true });
  if (validation) {
    donateThanks = thanx.join('');
  };
};
// **popups
function togglePopup(){
  mainPopup.classList.toggle('popup_opened');
};
function popupSkipFirst() {
  firstDonatePopup.classList.toggle('popup_opened');
  step++;
};
function closeAllPopups() {
  if (step === 3) {
    document.querySelector('.donate__submit').classList.remove('donate__submit-complete');
    document.querySelector('.donate__submit').innerHTML = 'next<img src="../../assets/icons/arrow.svg" alt="Next">';
  };
  step = 0;
  mainPopup.classList.remove('popup_opened');
  firstDonatePopup.classList.remove('popup_opened');
  document.forms[1].classList.remove('donate-amount__container_hidden');
  document.forms[2].classList.add('donate-amount__container_hidden');
  document.forms[3].classList.add('donate-amount__container_hidden');
  document.querySelector('.donate__circles').children[1].classList.remove('donate__circle_step');
  document.querySelector('.donate__circles').children[2].classList.remove('donate__circle_step');
  document.querySelector('.donate__back').classList.add('donate__back_hidden');
  document.querySelector('.donate__submit').removeAttribute('disabled', 'true');
  document.querySelector('.donate__submit-text').classList.remove('donate__submit-text_error');

};
function amountSwitcher(){
  const buttons = rates.querySelectorAll('button');
  let flag;
  if ((!donateData.price) || (donateData.price === `$`)) {
    donateData.price = '$10';
  };
  buttons.forEach((item, index) => {
    if (item.textContent === donateData.price) {
      buttons[index].classList.add('donate-amount__rate_active');
      if (index === 6) {
        donateInput.removeAttribute('disabled');
      } else {
        donateInput.setAttribute('disabled', 'true');
        donateInput.value = '';
      };
    } else {
      buttons[index].classList.remove('donate-amount__rate_active');
    };
  });
  buttons.forEach((item) => {
    if (item.classList.contains('donate-amount__rate_active')) { flag = true; };
  });
  if (!flag) {
    const value = +donateData.price.slice(1);
    buttons[6].classList.add('donate-amount__rate_active');
    donateInput.removeAttribute('disabled');
    donateInput.value = value;
  };
};
function getDonateInfo(e){
  donateData.price = e.target.textContent;
  togglePopup();
  firstDonatePopup.classList.toggle('popup_opened');
  amountSwitcher();
  step++;
};
function quickDonate() {
  donateData.price = priceValue;
  popupSkipFirst();
  amountSwitcher();
}
function petSwitch(e){
  const button = donatePets.querySelector('button');
  if ((e.target.type === 'button') || (e.target.type === 'select-one')) {
    button.classList.add('donate-amount__rate_active');
  };
};
function firstStep(){
  const pet = donatePets.querySelector('select').value;
  const gift = donatePets.querySelector('input').checked;
  if (pet !== 'Choose your favourite') { donateData.pet = pet; };
  if (gift) { donateData.gift = gift; };
  if (donateInput.value) { donateData.price = donateInput.value; };
  document.forms[1].classList.add('donate-amount__container_hidden');
  document.forms[2].classList.remove('donate-amount__container_hidden');
};
function secondStep(){
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  if (name !== '') { donateData.name = name; };
  if (email !== '') {
    const reg = /.+@.+\..+/i;
    if (reg.test(email)) {
      donateData.email = email;
    };
  };
  document.forms[2].classList.add('donate-amount__container_hidden');
  document.forms[3].classList.remove('donate-amount__container_hidden');
  document.querySelector('.donate__submit').classList.add('donate__submit-complete');
  document.querySelector('.donate__submit').innerHTML = 'complete donation<img src="../../assets/icons/arrow.svg" alt="Next">';
};
function thirdStep(){
  const numb = document.getElementById('card-num').value;
  const cvv = document.getElementById('card-cvv').value;
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  if (numb.length === 16) { donateData.numb = numb; };
  if (cvv.length === 3) { donateData.cvv = cvv; };
  if (month !== 'Month') {donateData.month = month; };
  if (year !== 'Year') { donateData.year = year; };
  donateValidation();
  if (donateThanks !== '') {
    firstDonatePopup.classList.toggle('popup_opened');
    document.forms[1].classList.remove('donate-amount__container_hidden');
    document.forms[3].classList.add('donate-amount__container_hidden');
    document.querySelector('.donate__submit').classList.remove('donate__submit-complete');
    document.querySelector('.donate__submit').innerHTML = 'next<img src="../../assets/icons/arrow.svg" alt="Next">';
    console.log('уйдет на сервер:', JSON.stringify(donateData));
    alert(donateThanks);
  } else {
    document.querySelector('.donate__submit-text').classList.add('donate__submit-text_error');
  };
};
function formSubmit(){
  if (step === 1) { firstStep(); };
  if (step === 2) { secondStep(); };
  if (step === 3) { thirdStep(); };
  if (step < 3) {
    document.querySelector('.donate-popup__text').textContent = titles[step];
    document.querySelector('.donate__circles').children[step].classList.add('donate__circle_step');
  };
  if ((step !== 3) || (donateThanks !== '')) {
    step++;
  };
  if (step !== 1) {
    document.querySelector('.donate__back').classList.remove('donate__back_hidden');
  };
  if (step > 3) { step = 0; };
};
function formBack(){
  document.querySelector('.donate__submit').removeAttribute('disabled', 'true');
  document.querySelector('.donate__submit-text').classList.remove('donate__submit-text_error');
  if (step === 3) {
    document.querySelector('.donate__submit').classList.remove('donate__submit-complete');
    document.querySelector('.donate__submit').innerHTML = 'next<img src="../../assets/icons/arrow.svg" alt="Next">';
  };
  document.forms[step].classList.add('donate-amount__container_hidden');
  step--;
  document.querySelector('.donate__circles').children[step].classList.remove('donate__circle_step');
  document.forms[step].classList.remove('donate-amount__container_hidden');
  document.querySelector('.donate-popup__text').textContent = titles[step];
  if (step === 1) { donateBack.classList.add('donate__back_hidden'); };
};
// **mobile
function mobileMenu() {
  document.querySelector('.main__nav-links').classList.toggle('nav_mobile');
  document.querySelector('.main__nav-links').classList.toggle('main__nav-links_opened');
  mobileMenuButton.classList.toggle('header__mobile-button_opened');
}
function mobileSlideSwitch(e, selector) {
  const num = +e.target.id.split('-')[1];
  if (e.target.id) {
    let box;
    if (selector === 'testimonials') {
      box = 'items';
    } else { box = 'container'; };
    const slider = document.querySelector(`.${selector}__${box}`);
    if (selector === 'testimonials') {
      mobileTestimSliderBtns[mobileTestimSlideStep].classList.remove('testimonials__mobile-slider-circle_active');
    } else {
      mobileSliderBtns[mobileSlideStep].classList.remove('favourites__mobile-slider-circle_active');
    };
    slider.classList.remove(`${selector}__${box}_1`);
    slider.classList.remove(`${selector}__${box}_2`);
    slider.classList.remove(`${selector}__${box}_3`);
    if (num !== 0) {
      slider.classList.add(`${selector}__${box}_${num}`)
    };
    if (selector === 'testimonials') {
      mobileTestimSlideStep = num;
      mobileTestimSliderBtns[mobileTestimSlideStep].classList.add('testimonials__mobile-slider-circle_active');
    } else {
      mobileSlideStep = num;
      mobileSliderBtns[mobileSlideStep].classList.add('favourites__mobile-slider-circle_active');
    };
  };
};
// **render template
function addSlides(array) {
  array.forEach((item) => {
    const slide = new Slide(item, slider);
    document.querySelector('.pets__slider').append(slide.generateSlide());
  });
};
function addFavorites(array) {
  array.forEach((item) => {
    const favorite = new Favorite(item, container);
    document.querySelector('.favourites__container').append(favorite.generateFavorite());
  });
};
function addTestimonials(array) {
  array.forEach((item) => {
    const testimonial = new Testimonial(item, testims);
    document.querySelector('.testimonials__items').prepend(testimonial.generateTestimonial());
  });
};
// **sliders
function petsCarousel(direction) {
  const width = window.innerWidth;
  let bias;
  let edge;
  if (width >= 1920) {
    bias = 480;
    edge = -5;
  } else {
    bias = 475;
    edge = -6;
  };
  if(petsSlider.hasAttribute('style')) {
    petsSlider.removeAttribute('style');
  };
  if(direction === 'left') {
    petsSliderCounter++;
  } else { petsSliderCounter-- };
  petsSlider.setAttribute('style', `margin-left: ${petsSliderCounter * bias}px`);
  if (petsSliderCounter === 0) {
    petsSliderBtns[0].setAttribute('disabled', 'true');
    petsSliderBtns[0].classList.add('pets__slider-btn_disabled');
  } else {
    petsSliderBtns[0].removeAttribute('disabled', 'true');
    petsSliderBtns[0].classList.remove('pets__slider-btn_disabled');
  };
  if (petsSliderCounter === edge) {
    petsSliderBtns[1].setAttribute('disabled', 'true');
    petsSliderBtns[1].classList.add('pets__slider-btn_disabled');
  } else {
    petsSliderBtns[1].removeAttribute('disabled', 'true');
    petsSliderBtns[1].classList.remove('pets__slider-btn_disabled');
  };
};
function testimSlider(direction) {
  const slides = document.querySelectorAll('.testimonials__item');
  const topArr = testimItems.slice(0, 6);
  const bottomArr = testimItems.slice(6);
  let newArr = [];
  for (let i = 0; i < slides.length; i++){
    slides[i].remove();
  };
  if (direction === 'left') {
    const topElem = topArr[5];
    const bottomElem = bottomArr[5];
    topArr.pop();
    topArr.unshift(topElem);
    bottomArr.pop();
    bottomArr.unshift(bottomElem);
  } else {
    const topElem = topArr[0];
    const bottomElem = bottomArr[0];
    topArr.shift();
    topArr.push(topElem);
    bottomArr.shift();
    bottomArr.push(bottomElem);
  };
  newArr.push(...topArr, ...bottomArr);
  testimItems = newArr;
  addTestimonials(testimItems);
  testimonialsDirection = () => testimSlider(direction);
};
function sliderPaused() {
  const direction = testimonialsDirection.toString().split("'")[1];
  if (!direction) {
    testimonialsDirection = () => testimSlider(direct);
  };
  testimonialsDirection = () => testimSlider(direction);
  clearInterval(startInterval);
  setTimeout(() => {
    startInterval = setInterval(testimonialsDirection, 15000);
  }, 60000);
};
function autoSlider(direction) {
  if (direction === 'left') {
    testimonialsDirection = () => testimSlider('left');
  } else {
    testimonialsDirection = () => testimSlider('right');
  };
  direct = direction;
  sliderPaused();
};

// **redirect to pages
function redirect(page, attr){
  let arr = location.href.split('/');
  let newArr = arr.slice(0, arr.length-2);
  newArr.push(`${page}`);
  newArr.push(`${page}.html`);
  let string = newArr.join('/');
  if (attr) {
    string = string + `#${attr}#header`;
    if (PAGES.some((item) => { return item === attr; })) {
      location.replace(string);
    } else { return };
  } else {
    location.replace(string);
  };
};

// **clases
class Slide {
  constructor(data, slideSelector) {
    this._src = data.src;
    this._alt = data.alt;
    this._name = data.name;
    this._title = data.title;
    this._text = data.text;
    this._slideSelector = slideSelector;
  };

  _setEventListeners() {
    const button = this._element.querySelector('.pets__slide-btn')
    this._element.addEventListener('click', () => {
      const animal = this._alt.split(' ')[0];
      redirect('zoos', `${animal}`);
    });
    button.addEventListener('mouseover', () => {
      button.querySelector('img').src="../../assets/icons/arrow.svg";
    });
    button.addEventListener('mouseout', () => {
      button.querySelector('img').src="../../assets/icons/orange-arrow.svg";
    });
  };

  _getTemplate() {
    const slideElement = this._slideSelector
      .content
      .querySelector('.pets__slide')
      .cloneNode(true);
    this._element = slideElement;
    return this._element;
  }

  generateSlide() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('img').src = this._src;
    this._element.querySelector('img').alt = this._alt;
    this._element.querySelector('.pets__slide-name')
      .textContent = this._name;
    this._element.querySelector('.pets__slide-content')
      .querySelector('.pets__slide-title')
      .textContent = this._title;
    this._element.querySelector('.pets__slide-content')
      .querySelector('.pets__slide-text')
      .textContent = this._text;
    return this._element;
  };
};
class Favorite {
  constructor(data, favoriteSelector) {
    this._src = data.src;
    this._alt = data.alt;
    this._text = data.text;
    this._favoriteSelector = favoriteSelector;
  };

  _setEventListeners() {
    const button = this._element.querySelector('.favourites__card-btn');
    this._element.addEventListener('click', () => {
      redirect('zoos', `${this._alt}`);
    });
    button.addEventListener('mouseover', () => {
      button.querySelector('img').src="../../assets/icons/arrow.svg";
    });
    button.addEventListener('mouseout', () => {
      button.querySelector('img').src="../../assets/icons/orange-arrow.svg";
    });
  };

  _getTemplate() {
    const favoriteElement = this._favoriteSelector
      .content
      .querySelector('.favourites__card')
      .cloneNode(true);
    this._element = favoriteElement;
    return this._element;
  };

  generateFavorite() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('img').src = this._src;
    this._element.querySelector('img').alt = this._alt;
    this._element.querySelector('.favourites__card-text')
      .textContent = this._text;
    return this._element;
  };
};
class Testimonial {
  constructor(data, testimonialSelector) {
    this._title = data.title;
    this._author = data.author;
    this._text = data.text;
    this._testimonialSelector = testimonialSelector;
  };

  _setEventListeners() {
    this._element.addEventListener('click', sliderPaused);
  };

  _getTemplate() {
    const testimonialElement = this._testimonialSelector
      .content
      .querySelector('.testimonials__item')
      .cloneNode(true);
    this._element = testimonialElement;
    return this._element;
  };

  generateTestimonial() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelectorAll('p')[0].textContent = this._text;
    this._element.querySelectorAll('p')[1].textContent = this._author;
    this._element.querySelector('.testimonials__item-title').textContent = this._title;
    return this._element;
  };
};

// **start preload functions
addSlides(SLIDES);
addFavorites(FAVORITES);
addTestimonials(TESTIMONIALS);
// **set event listeners
viewPanda.addEventListener('click', () => {redirect('zoos', 'panda')});
petsButton.addEventListener('click', () => {redirect('map')});
closePopupButton.addEventListener('click', togglePopup);
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup_opened')) {
    closeAllPopups();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllPopups();
  };
});
donateButton.addEventListener('click', togglePopup);
secondDonateButton.addEventListener('click', togglePopup);
quickDonateButton.addEventListener('click', quickDonate);
mobileDonateButton.addEventListener('click', popupSkipFirst);
firstNumberInput.addEventListener('input', (e) => { inputLimiter(e, 4); });
secondNumberInput.addEventListener('input', (e) => { inputLimiter(e, 4); });
thirdNumberInput.addEventListener('input', (e) => { inputLimiter(e, 16); });
fourdNumberInput.addEventListener('input', (e) => { inputLimiter(e, 3); });
rates.addEventListener('click', (e) => {
  if (e.target.type === 'button') {
    donateData.price = e.target.textContent;
    amountSwitcher();
  };
});
donatePets.addEventListener('click', (e) => { petSwitch(e); });
donateSubmit.addEventListener('click', formSubmit);
donateBack.addEventListener('click', formBack);
petsSliderBtns[0].addEventListener('click', () => { petsCarousel('left'); });
petsSliderBtns[1].addEventListener('click', () => { petsCarousel('right'); });
testimSliderBtns[0].addEventListener('click', () => { autoSlider('right'); });
testimSliderBtns[1].addEventListener('click', () => { autoSlider('left'); });
mobileMenuButton.addEventListener('click', mobileMenu);
mobileTestimSlider.addEventListener('click', (e) => { mobileSlideSwitch(e, 'testimonials'); });
mobileSlider.addEventListener('click', (e) => { mobileSlideSwitch(e, 'favourites'); });
for (let i=0; i<petsMainBtns.length; i++) {
  petsMainBtns[i].addEventListener('mouseover', () => {
    petsMainBtns[i].querySelector('img').src="../../assets/icons/arrow.svg";
  });
  petsMainBtns[i].addEventListener('mouseout', () => {
    petsMainBtns[i].querySelector('img').src="../../assets/icons/purple-arrow.svg";
  });
  petsMainBtns[i].addEventListener('click', () => {
    redirect('map');
  });
};
for(let i=0; i<priceButtons.length; i++){
  priceButtons[i].addEventListener('click', (e) => { getDonateInfo(e); });
};