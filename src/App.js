import React, { useState } from "react";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div>
      { 
      <div className="App">
        <img className="logo" src="/images/logo.png" alt="logo" />
      </div>
      }

      {isSignup ? (
        <RegisterForm onSwitch={handleFormSwitch} />
      ) : (
        <LoginForm onSwitch={handleFormSwitch} />
      )}
    </div>
  );
};

export default App;

