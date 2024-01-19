import React from "react";
import ClientList from "./components/ClientList";
import background from "./img/background.jpg";
import logo from "./img/logo.png";
import "./App.css";

const App = () => {
  const containerStyle = {
    background: `url(${background}) no-repeat center center fixed`,
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", 
    color: "#fff",
    paddingTop: "50px",
  };

  const logoStyle = {
    width: "250px",
    height: "auto",
    marginBottom: "20px",
  };

  const tableContainerStyle = {
    width: "80%",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} className="logo-with-shadow" />
      <div style={tableContainerStyle}>
        <ClientList />
      </div>
    </div>
  );
};

export default App;
