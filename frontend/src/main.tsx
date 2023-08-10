import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ServicesPage from './pages/Services/ServicesPage';
import ServiceItemsPage from './pages/ServiceItems/ServiceItemsPage';
import WellsPage from './pages/Wells/WellsPage';
import CustomersPage from './pages/Customers/CustomersPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import App from './App';

import './index.css';

const router = createBrowserRouter([
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
        path: '/pocos',
        element: <WellsPage />,
      },
      {
        path: '/itens-servico',
        element: <ServiceItemsPage />,
      },
      {
        path: '/clientes',
        element: <CustomersPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
