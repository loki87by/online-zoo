// **imports
import animals from './сonsts.js';

// **conts
const main = document.querySelector('.main');
const template = document.getElementById('main');
const location = window.location.href;
const locationParts = location.split('#');
const mobileMenuButton = document.querySelector('.header__mobile-button');
let animal = locationParts[1];
if (!animal) { animal = 'panda' };

// **clases
class Context {
  constructor(data, selector) {
    this._title = data.title;
    this._videos = data.videos;
    this._donate = data.donate;
    this._description = data.description;
    this._selector = selector;
  };

  _getTemplate() {
    const element = this._selector
      .content
      .querySelector('.template')
      .cloneNode(true);
    this._element = element;
    return this._element;
  };

  _toggleSidebar(){
    const sidebar = this._element.querySelector('aside');
    const beasts = sidebar.querySelectorAll('.aside__element');
    let img = sidebar.querySelector('.aside__button-img');
    sidebar.classList.toggle('aside_opened');
    sidebar.querySelector('.aside__label').classList.toggle('aside__label_opened');
    beasts.forEach((item) => {
      const icon = item.querySelector('.aside__icon');
      const text = item.querySelector('.aside__text');
      item.classList.toggle('aside__element_open');
      icon.classList.toggle('aside__icon_hide');
      if (icon.classList.contains('aside__icon-active')) {
        icon.classList.toggle('aside__icon-active_hide');
      };
      text.classList.toggle('aside__text_open');
    });
    if(img.alt === 'open sidebar'){
      img.alt = 'hide sidebar';
      img.src = '../../assets/icons/hide.svg';
    } else {
        img.alt = 'open sidebar';
        img.src = '../../assets/icons/open.svg';
    };
    sidebar.querySelector('.aside__slider-button').classList.toggle('aside__slider-button_open');
  };

  _setActiveClass(){
    const sidebar = this._element.querySelector('aside');
    const beasts = sidebar.querySelectorAll('.aside__element');
    beasts.forEach((i) => {
      const icon = i.querySelector('.aside__icon');
      if (i.id === animal) {
        icon.classList.add('aside__icon-active');
        icon.classList.add('aside__icon-active_hide');
      } else {
        icon.classList.remove('aside__icon-active');
        icon.classList.remove('aside__icon-active_hide');
      };
    });
  };

  _switchAnimal(e){
    let id;
    if (!e.target.id) {
      if (!e.target.parentNode.id) {
        id = e.target.parentNode.parentNode.id;
      } else {
        id = e.target.parentNode.id;
      }
    } else {
      id = e.target.id;
    }
    window.location.replace(`${locationParts[0]}#${id}`);
    animal = id;
    addContext(id, true);
  };

  _setFirstAnimal(){
    const sidebar = this._element.querySelector('aside');
    const beasts = sidebar.querySelectorAll('.aside__element');
    let index;
    beasts.forEach((item, num) => {
      if (item.id === animal) { index = num };
    });
    if (index !== 0) {
      const duplicate = beasts[index].cloneNode(true);
      sidebar.insertBefore(duplicate, beasts[0]);
      sidebar.removeChild(beasts[index]);
    }
  };

  _inputLimiter(event){
    if (event.target.value.length > 4) {
      let maxValue = event.target.value.split('').slice(0, 4).join('');
      event.target.value = maxValue;
    }
  };

  _switchVideo(event){
    const videoHiddenLayers = this._element.querySelectorAll('.cams__blocker');
    const mainVideoHiddenLayer = videoHiddenLayers[0];
    const currentVideo = event.target;
    const frames = this._element.querySelectorAll('iframe');
    const mainVideoSource = frames[0].src;
    let currentVideoSource;
    let currentVideoHiddenLayer;
    if (currentVideo.classList.contains('cams__blocker_frame')) {
      currentVideoHiddenLayer = mainVideoHiddenLayer;
      currentVideoSource = mainVideoHiddenLayer.parentElement.children[3].src;
    } else {
      currentVideoHiddenLayer = currentVideo;
      currentVideoSource = currentVideoHiddenLayer.parentElement.children[0].src;
    };
    if (mainVideoSource !== currentVideoSource) {
      if (mainVideoHiddenLayer.classList.contains('cams__blocker_hide')) {
        mainVideoHiddenLayer.classList.remove('cams__blocker_hide');
      }
      mainVideoHiddenLayer.parentElement.children[3].src = currentVideoSource;
      currentVideoHiddenLayer.parentElement.children[0].src = mainVideoSource;
    };
    if (currentVideoHiddenLayer === mainVideoHiddenLayer) {
      mainVideoHiddenLayer.classList.add('cams__blocker_hide');
    };
  };

  _toggleElements(){
    const sidebar = this._element.querySelector('aside');
    const beasts = sidebar.querySelectorAll('.aside__element');
    beasts.forEach((item) => {
      item.classList.toggle('aside__element_hide');
    });
  };

  _shiftSlide(e){
    const camsSliderLeftBtn = this._element.querySelector('.cams__slider-btn_right');
    const camsSliderRightBtn = this._element.querySelector('.cams__slider-btn_left');
    const slides = this._element.querySelectorAll('.cams__slide');
    let arr = [];
    slides.forEach((it, ind) => {
      if (!it.classList.contains('cams__slide_disabled')) {
        arr.push(ind);
      };
    });
    const first = Math.min(...arr);
    const last = Math.max(...arr);
    if (e.target === camsSliderLeftBtn) {
      if (last === slides.length - 2) {
        camsSliderLeftBtn.setAttribute('disabled', 'true');
      };
      camsSliderRightBtn.removeAttribute('disabled');
      slides[first].classList.toggle('cams__slide_disabled');
      slides[last + 1].classList.toggle('cams__slide_disabled');
    } else {
      if (first === 1) {
        camsSliderRightBtn.setAttribute('disabled', 'true');
      };
      camsSliderLeftBtn.removeAttribute('disabled');
      slides[first - 1].classList.toggle('cams__slide_disabled');
      slides[last].classList.toggle('cams__slide_disabled');
    };
  };

  _setEventListeners(){
    const toggleIcons = this._toggleSidebar.bind(this);
    const toggleElems = this._toggleElements.bind(this);
    const sidebar = this._element.querySelector('aside');
    const sidebarButtons = sidebar.querySelectorAll('.aside__button');
    const openSidebarButton = sidebarButtons[0];
    const scrollSidebarButton = sidebarButtons[1];
    const beasts = sidebar.querySelectorAll('.aside__element');
    const numberInput = this._element.querySelector('.donate__form-input');
    const mapLink = this._element.querySelector('.info__description-button');
    const camsSliderLeftBtn = this._element.querySelector('.cams__slider-btn_right');
    const camsSliderRightBtn = this._element.querySelector('.cams__slider-btn_left');
    const videoHiddenLayers = this._element.querySelectorAll('.cams__blocker');
    if (animal === 'eagles') {
      mapLink.classList.add('info__description-button_eagle');
    };
    openSidebarButton.addEventListener('click', toggleIcons);
    scrollSidebarButton.addEventListener('click', toggleElems);
    for (let i=0; i<videoHiddenLayers.length; i++) {
      videoHiddenLayers[i].addEventListener('click', (e) => { this._switchVideo(e) });
    };
    camsSliderLeftBtn.addEventListener('click', (e) => { this._shiftSlide(e) });
    camsSliderRightBtn.addEventListener('click', (e) => { this._shiftSlide(e) });
    mapLink.addEventListener('mouseover', () => {
      mapLink.querySelector('img').src="../../assets/icons/arrow.svg";
    });
    mapLink.addEventListener('mouseout', () => {
      mapLink.querySelector('img').src="../../assets/icons//orange-arrow.svg";
    });
    mapLink.addEventListener('click', () => { redirect('map') });
    beasts.forEach((i) => {
      i.addEventListener('click', this._switchAnimal);
    });
    numberInput.addEventListener('input', this._inputLimiter);
  };

  generateContext() {
    this._getTemplate();
    this._setActiveClass();
    this._setFirstAnimal();
    this._setEventListeners();
    const mainTitle = this._element.querySelector('.cams__title');
    const mainVideo = this._element.querySelector('iframe');
    const otherVideos = this._element.querySelectorAll('.cams__slide-video');
    const donate = this._element.querySelector('.donate');
    const donateTitle = donate.querySelector('h3');
    const donateText = donate.querySelector('.donate__text');
    const noteText = this._element.querySelector('.info__note-text');
    const description = this._element.querySelector('.info__description');
    const notes = description.querySelectorAll('span');
    const text = description.querySelector('.info__description-text');
    const image = description.querySelector('.info__description-image');
    mainTitle.textContent = this._title;
    mainVideo.src = `https://www.youtube.com/embed/${this._videos[0]}`;
    otherVideos.forEach((item, index) => {
      item.src = `https://www.youtube.com/embed/${this._videos[index + 1]}`;
    });
    donateTitle.textContent = this._donate.title;
    donateText.textContent = this._donate.text;
    noteText.textContent = this._description.note;
    notes.forEach((item, index) => {
      let text = item.querySelector('p');
      text.textContent = this._description.animalData[index];
    });
    text.textContent = this._description.text;
    image.src = this._description.image;
    return this._element;
  }
}

// **functional
// *change DOM
function addContext(beast, method) {
  const context = new Context(animals[`${beast}`], template);
  if (!method) {
    main.append(context.generateContext());
  } else {
    main.append(context.generateContext());
    let layers = main.querySelectorAll('.template');
    main.removeChild(layers[0]);
  };
};
addContext(animal);
// *mobile menu
function mobileMenu() {
  document.querySelector('.nav__links').classList.toggle('nav_mobile');
  document.querySelector('.nav__links').classList.toggle('nav__links_opened');
  mobileMenuButton.classList.toggle('header__mobile-button_opened');
};

// *redirect to pages
function redirect(page){
  let arr = window.location.href.split('/');
  let newArr = arr.slice(0, arr.length-2);
  newArr.push(`${page}`);
  newArr.push(`${page}.html`);
  let string = newArr.join('/');
  window.location.replace(string);
};
// **event listeners
mobileMenuButton.addEventListener('click', mobileMenu);
