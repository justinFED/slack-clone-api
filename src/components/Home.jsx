import React from "react";
import "./Home.css";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

function Home() {
  return (
    <div>
      <Header />
      <div className="app-body">
        <Sidebar />

        <Routes>
          {/* Define a route for the chat interface */}
          <Route
            path="/channel/:channelName/user/:selectedUserId"
            element={<Chat />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
