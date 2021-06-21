const mobileMenuButton = document.querySelector('.header__mobile-button');
const icons = document.querySelectorAll('svg');

// **redirect to pages
function redirect(e){
  let animal;
  if (e.path.length === 7) {
    animal = e.target.id;
  } else {
    animal = e.path[1].id;
  }
  let arr = location.href.split('/');
  let newArr = arr.slice(0, arr.length-2);
  newArr.push(`zoos`);
  newArr.push(`zoos.html`);
  let string = newArr.join('/');
  string = string + `#${animal}#header`
  location.replace(string);
};

function mobileMenu() {
  document.querySelector('.nav__links').classList.toggle('nav_mobile');
  document.querySelector('.nav__links').classList.toggle('nav__links_opened');
  mobileMenuButton.classList.toggle('header__mobile-button_opened');
}

for(let i=0; i<icons.length; i++) {
  icons[i].addEventListener('click', (e) => {redirect(e)});
}
mobileMenuButton.addEventListener('click', mobileMenu);
