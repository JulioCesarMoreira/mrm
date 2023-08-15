import { Outlet } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';

function App() {
  return (
    <div className="max-w-[100vw] h-screen max-h-[100vh] flex">
      <SideMenu />
      <div className="overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
