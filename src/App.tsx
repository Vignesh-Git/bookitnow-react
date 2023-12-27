import React from "react";
import MyRouter from "routers/index";
import { ToastContainer, toast } from "react-toastify";
import ErrorBoundary from "components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <MyRouter />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
