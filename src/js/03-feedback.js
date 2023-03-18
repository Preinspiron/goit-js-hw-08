import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
let tempStorage = {};
const LOCAL_TEMP_STORAGE = 'feedback-form-state';

const onFormInit = () => {
  // const formData = new FormData(formRef);
  const localStorageInit = localStorage.getItem(LOCAL_TEMP_STORAGE);

  if (localStorageInit) {
    try {
      tempStorage = JSON.parse(localStorageInit);
      Object.entries(tempStorage).forEach(([name, value]) => {
        formRef.elements[name].value = value;
      });
    } catch (error) {
      console.log('Err', error.name, error.message);
    }
  }
};

onFormInit();

const onFormInput = e => {
  e.preventDefault();
  if (e.currentTarget !== e.target) {
    const { name, value } = e.target;
    try {
      tempStorage[name] = value;
      localStorage.setItem(LOCAL_TEMP_STORAGE, JSON.stringify(tempStorage));
    } catch (error) {
      console.log('Oops:', error.name);
    }
  }
};

const onFormSubmit = e => {
  e.preventDefault();
  console.log(tempStorage);
  tempStorage = {};
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_TEMP_STORAGE);
};

const throttledFunc = throttle(onFormInput, 2000);

formRef.addEventListener('input', throttledFunc);
formRef.addEventListener('submit', onFormSubmit);
