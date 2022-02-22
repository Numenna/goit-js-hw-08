import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const formInput = document.querySelector("input");
const formTextarea = document.querySelector("textarea");
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

populateData();

const onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    };

const onFormInput = () => {
    formData = {
        email: formInput.value,
        message: formTextarea.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    };

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onFormInput, 500)); 

function populateData() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
        
    if(savedData) {
        formInput.value = savedData.email;
        formTextarea.value = savedData.message;
    };
};
