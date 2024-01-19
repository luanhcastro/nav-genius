import React from "react";
import ClientList from "./components/ClientList";
import background from "./img/background.jpg";

const App = () => {
  const containerStyle = {
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <ClientList />
    </div>
  );
};

export default App;
