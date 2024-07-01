import React, { useState, useEffect } from "react";
import "./App.css";
import Layout from "./layouts/layout";
import ChatComponent from "./components/chatComponent";
import Greetings from "./components/greetings";
import Citations from "./components/citations";
import Modals from './components/Modal/Modal';
import Loading from "./components/loading";

function App() {
  const [domainType, setDomainType] = useState(false);
  const [showGreetings, setShowGreetings] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleDomainType = () => {
    setDomainType(!domainType);
    setShowPrompts(!showPrompts);
  };

  return (
    <>
      {isLoading ? (
       <Loading/>
      ) : (
        <Layout>
          <div className="App">
            <button onClick={toggleDomainType}>
              AML-CFT Mode: {domainType ? "On" : "Off"}
            </button>

            <ChatComponent domainType={domainType} setShowGreetings={setShowGreetings} />

            {showGreetings && (
              <div className="greetings w-full flex items-center justify-center ml-auto mr-auto">
                <Greetings showPrompts={showPrompts} />
              </div>
            )}
            </div>
        </Layout>
      )}
    </>
  );
}

export default App;
