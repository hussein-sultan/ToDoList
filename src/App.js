import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="container mx-auto">
      <Header title={"مهامي"} />
      <Main />
    </div>
  );
}
