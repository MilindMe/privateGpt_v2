import React from "react";
import ChatComponent from "./chatComponent";
import Greetings from "./greetings";

function Home({ domainType, toggleDomainType, showGreetings, setShowGreetings, showPrompts }) {
  return (
    <div className="Home">
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
  );
}

export default Home;
