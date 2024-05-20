import React, { useState } from "react";
import "./App.css";
import Layout from "./layouts/layout";
import ChatComponent from "./components/chatComponent";

function App() {
  const [domainType, setDomainType] = useState(false);

  const toggleDomainType = () => {
    setDomainType(!domainType);
  };

  return (
    <Layout>
      <div className="App">
        <h1>BdoGPT_debug</h1>
        <button onClick={toggleDomainType}>
          AML-CFT Mode: {domainType ? "On" : "Off"}
        </button>
        <ChatComponent domainType={domainType} />
      </div>
    </Layout>
    
  );
}

export default App;
