import './Home.css'
import Header from '../components/Header/Header'
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';






function Home() {
  return (
    <>
    <Header />
    <div className="app-body">
      <Sidebar />
      <Chat />
    
    </div>

    </>
  );
}

export default Home;
