import React from "react";
import "./Home.css";
import { Routes, Route } from "react-router-dom"; // Remove the BrowserRouter import
import Header from "../components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import ChannelsList from "./Channels/ChannelList";

function Home() {
  return (
    <div>
      <Header />
      <div className="app-body">
        <Sidebar />
       
        <Routes>
          <Route path="/channel/:channelName" element={<Chat />} />
        </Routes>
        <ChannelsList />
      </div>
    </div>
  );
}

export default Home;
