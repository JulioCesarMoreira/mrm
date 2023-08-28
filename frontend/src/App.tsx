import { Outlet } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';
import { Toaster } from '@components/ui/toaster';

function App() {
  return (
    <div className="flex h-screen max-h-[100vh] max-w-[100vw]">
      <SideMenu />
      <Toaster />
      <div className="w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
