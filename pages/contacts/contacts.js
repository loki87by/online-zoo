const form = document.forms[0]
const mobileMenuButton = document.querySelector('.header__mobile-button');

class FormValidator {
  constructor(data, element) {
    this._inputSelector = data.inputSelector; //инпуты
    this._submitButtonSelector = data.submitButtonSelector; //кнопка сохранить/создать
    this._inactiveButtonClass = data.inactiveButtonClass; //неактивная кнопка
    this._inputErrorClass = data.inputErrorClass; //ошибка в инпуте
    this._errorClass = data.errorClass; //ошибка в спане
    this._element = element;
  }
  // Функция добавки ошибки
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  // Функция, очистки ошибки
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  // вызов и скрытие ошибки
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
  //проверка на валидность
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  //активация/дезактивация кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };
  //добавка слушателей
  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  };
  //активаия валидации
  enableValidation = () => {
   this._setEventListeners(this._element);
  };
};

function validation() {
  const valid = new FormValidator({
    formSelector: "form",
    inputSelector: ".main__input",
    submitButtonSelector: ".main__submit",
    inactiveButtonClass: "main__submit_error",
    inputErrorClass: "main__input_error",
    errorClass: "main__input-span"
  }, form);
  valid.enableValidation();
};

function mobileMenu() {
  document.querySelector('.nav__links').classList.toggle('nav_mobile');
  document.querySelector('.nav__links').classList.toggle('nav__links_opened');
  mobileMenuButton.classList.toggle('header__mobile-button_opened');
}

validation();

mobileMenuButton.addEventListener('click', mobileMenu);