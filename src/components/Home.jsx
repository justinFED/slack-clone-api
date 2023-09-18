import './Home.css'
import Header from '../components/Header/Header'
import Sidebar from './Sidebar/Sidebar';





function Home() {
  return (
    <>
    <Header />
    <div className="app-body">
      <Sidebar />
    </div>
    </>
  );
}

export default Home;
