/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

function App() {
  return (
    <div
      className="bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center p-6 bg-white shadow-md lg:p-12 scroll-mt-6 rounded-xl shadow-gray-200/90 w-[80%] h-[60%]">
        <h1 className="text-4xl font-extrabold text-gray-800  drop-shadow-lg">
          Welcome to Toolkit Plugin
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Your ultimate tool for boosting productivity and creativity. Let’s get
          started!
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100">
            Get Started
          </button>
        </div>
        <footer className="mt-8 text-sm ">
          © 2024 Toolkit Plugin. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;
