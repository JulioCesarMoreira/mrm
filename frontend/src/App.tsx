import { Outlet } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';

function App() {
  return (
    <div className="max-w-[100vw] h-screen max-h-[100vh] bg-gray-scale-800 flex">
      <SideMenu />
      <Outlet />
    </div>
  );
}

export default App;
