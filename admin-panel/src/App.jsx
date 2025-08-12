import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
const url = import.meta.env.VITE_API_URL || "http://localhost:6060";

  return (
    <div className="min-h-screen flex bg-gray-100">
      <ToastContainer />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow min-h-screen">
        <Sidebar />
      </aside>

      {/* Right side: Navbar + Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar at top */}
        <Navbar />

        {/* Routes section */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/add" element={<Add url={url}/>} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/order" element={<Order url={url}/>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
