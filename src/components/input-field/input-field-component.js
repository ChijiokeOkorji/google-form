import { useMemo, useRef, useState } from 'react';

import styles from './input-field-style.module.scss';

/*
PROP DESCRIPTION
type: to specify special input types (ie. password)
placeHolder: store placeholder text in ::before pseudo-element
value: the current value of the input element
onChange: to update the input value on change (ie. key press)
validateInput: object to handle input validation (ie. whether errors are displayed)
setShouldValidate: update whether input fields should now be validated
showPassword: whether password values should be visible (only for password inputs)
setShowPassword: update whether password values should be visible (only for password inputs)
errorMessage: error message to be displayed on invalid input
*/

const InputField = ({ type, placeHolder, value, onChange, validateInput, setShouldValidate, showPassword, setShowPassword, errorMessage }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputElement = useRef(null);
  const inputBoxElement = useRef(null);

  const createNameAttribute = useMemo(() => {
    const placeholderArray = placeHolder.trim().toLowerCase().split(/\s+/);

    const formattedString = placeholderArray.reduce((previous, current, index) => {
      if (!index) {
        return previous + current;
      }

      return previous + current.slice(0, 1).toUpperCase() + current.slice(1);
    }, '');

    return formattedString;
  }, [placeHolder]);
  
  function handleChange({ target }) {
    return onChange({[createNameAttribute]: target.value});
  }

  function handleFocus() {
    setIsInputFocused(true);
  }

  function handleBlur() {
    setIsInputFocused(false);

    setShouldValidate(createNameAttribute);
  }


  function clearInput() {
    onChange({
      [createNameAttribute]: ''
    });

    requestAnimationFrame(() => {inputElement.current.focus()});
  }

  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);

    requestAnimationFrame(() => {inputElement.current.focus()});
  }

  return (
    <div
      className={`${(validateInput.shouldValidate && !validateInput.isValid) ? `${styles.error} ` : ''}${(value || isInputFocused) ? `${styles.focus} ` : ''}${styles.inputBox}`}
      data-placeholder={placeHolder}
      ref={inputBoxElement}
      >
      <input
        className={styles.input}
        {...(
          (type === 'password' && !showPassword) ? {type: 'password'} : {}
        )}
        name={createNameAttribute}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputElement}
      />
      <div className={styles.iconArea}>
        {
          (type === 'password') ? (<i className={(showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye")} onMouseDown={togglePasswordVisibility} />) :
          (isInputFocused && value) ? (<i className="fa-solid fa-circle-xmark" onMouseDown={clearInput} />) : null
        }
      </div>
      {errorMessage && validateInput?.shouldValidate && !validateInput?.isValid &&
        <div className={styles.errorMessage}>{errorMessage}</div>
      }
    </div>
  );
};

export { InputField };
