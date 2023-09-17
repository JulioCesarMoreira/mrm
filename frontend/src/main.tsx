import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage';
import WellsPage from './pages/Wells/WellsPage';
import ClientsPage from './pages/Clients/ClientsPage';
import ServicesPage from './pages/Services/ServicesPage';
import ServiceItemsPage from './pages/ServiceItems/ServiceItemsPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import App from './App';

import './global.css';
import ServicesFormPage from 'pages/Services/ServicesFormPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/servicos',
        element: <ServicesPage />,
      },
      {
        path: '/servicos/editar/:proposalId',
        element: <ServicesFormPage />,
      },
      {
        path: '/servicos/novo',
        element: <ServicesFormPage />,
      },
      {
        path: '/pocos',
        element: <WellsPage />,
      },
      {
        path: '/itens-servico',
        element: <ServiceItemsPage />,
      },
      {
        path: '/clientes',
        element: <ClientsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
