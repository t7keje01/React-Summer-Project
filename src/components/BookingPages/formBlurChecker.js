export const formBlurChecker = () => {  
    const handleBlur = (event) => {
        const formElement = event.target;
        if (!formElement.checkValidity()) {
        formElement.classList.add('invalid');
        } else {
        formElement.classList.remove('invalid');
        }
    };

    const formElements = document.querySelectorAll('.formValidation');

    formElements.forEach((formElement) => {
        formElement.addEventListener('blur', handleBlur);
    });

    return () => {
        formElements.forEach((formElement) => {
            formElement.removeEventListener('blur', handleBlur);
        });
    };
};