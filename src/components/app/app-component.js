import { useCallback, useMemo, useState } from 'react';

import { Main } from '../main';
import { Form } from '../form';
import { InputField } from '../input-field';
import { Button } from '../button';

import styles from './app-style.module.scss';

const App = () => {
  // This stores the values of the input field
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  /*
  This handles input validation
  When we first access the input field, it is invalid, but an error is not shown
  An error is only shown when shouldValidate is true, and isValid is false
  */
  const [validateInput, setValidateInput] = useState({
    email: {
      shouldValidate: false,
      isValid: false,
      validationLogic: (input) => {
        if ((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(input)) {
          return true;
        }
      
        return false;
      }
    },
    password: {
      shouldValidate: false,
      isValid: false,
      validationLogic: (input) => {
        if ((/^.+$/).test(input)) {
          return true;
        }
      
        return false;
      }
    }
  });

  // Toggle to show/hide the password
  const [showPassword, setShowPassword] = useState(false);

  // Update stored input value, and check value validity
  const handleChange = useCallback((dataFromChild) => {
    setLoginData(prev => ({...prev, ...dataFromChild}));
    
    for (let key in dataFromChild) {
      setValidateInput(prevValid => ({...prevValid, [key]: {...prevValid[key], isValid: prevValid[key].validationLogic(dataFromChild[key])}}));
    }
  }, []);

  const setShouldValidate = useCallback((dataFromChild) => {
    setValidateInput(prev => {
      if (prev[dataFromChild].shouldValidate === false) {
        return ({...prev, [dataFromChild]: {...prev[dataFromChild], shouldValidate: true}});
      }

      return prev;
    });
  }, []);

  // Disable button if any input field is invalid
  const disableButton = useMemo(() => {
    for (let key in validateInput) {
      if (!(validateInput[key].isValid)) {
        return true;
      }
    }

    return false;
  }, [validateInput]);

  // Log the stored data object on input submission
  const handleSubmit = useCallback(() => {
    console.log({...loginData});
  }, [loginData]);

  return (
    <div className={styles.child}>
      <Main align="center">
        <Form title="Login Form" onSubmit={handleSubmit}>
          <InputField
            placeHolder="Email"
            value={loginData.email}
            onChange={handleChange}
            validateInput={validateInput.email}
            setShouldValidate={setShouldValidate}
            errorMessage="Please enter a valid email address"
          />
          <InputField
            type="password"
            placeHolder="Password"
            value={loginData.password}
            onChange={handleChange}
            validateInput={validateInput.password}
            setShouldValidate={setShouldValidate}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            errorMessage="Password cannot be blank"
          />

          <Button label="Login" disabled={disableButton} />
        </Form>
      </Main>
    </div>
  );
};

export { App };
