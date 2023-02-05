import "./App.css";
import ButtonSection from "./ButtonSection";

function App() {
  return (
    <>
      <div className="app">
        <div>
          <a href="#">
            <img src="/logo.svg" className="logo" alt="Gomu logo" />
          </a>
        </div>
        <h1>Gomu</h1>
        <p className="read-the-docs">
          基于 styled-component 开发的简单 React UI 库
        </p>
      </div>
      <ButtonSection />
    </>
  );
}

export default App;
