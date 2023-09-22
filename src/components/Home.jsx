import React, { useState } from "react";
import "./Home.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import NewMessage from "../components/NewMessage/NewMessage";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />
      <div className="app-body">
        <Sidebar />
        <Routes>
          <Route
            path="/channel/:channelName/user/:selectedUserId"
            element={<Chat />}
          />
        </Routes>
      </div>
      {isModalOpen && <NewMessage setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default Home;
