import React from "react";
import MyRouter from "routers/index";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
