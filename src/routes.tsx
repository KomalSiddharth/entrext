import LandingPage from './pages/LandingPage';
import BillingPage from './pages/BillingPage';
import PaymentSuccess from './pages/PaymentSuccess';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />
  },
  {
    name: 'Billing',
    path: '/billing',
    element: <BillingPage />,
    visible: false
  },
  {
    name: 'Payment Success',
    path: '/payment-success',
    element: <PaymentSuccess />,
    visible: false
  }
];

export default routes;