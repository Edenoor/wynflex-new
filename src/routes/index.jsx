import Root from '../Root.jsx'
import ErrorPage from "../views/ErrorPage";
import { LazyHome, LazyAboutUs, LazyServices, LazyJobs, LazyContact } from '../lazy-components/index.jsx'
import Buy from '../views/Buy.jsx';
import ImmersiveTest from '../views/ImmersiveTest.jsx';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LazyHome />
      },
      {
        path: 'quienes-somos',
        name: 'Quiénes Somos',
        element: <LazyAboutUs />
      },
      {
        path: 'servicios',
        name: 'Servicios',
        element: <LazyServices />
      },
      {
        path: 'servicios/contratar',
        element: <Buy />
      },
      {
        path: 'empleos',
        name: 'Empleos',
        element: <LazyJobs />
      },
      {
        path: 'contacto',
        name: 'Contacto',
        element: <LazyContact />
      },
      {
        path: 'immersive-test',
        element: <ImmersiveTest />
      }
    ]
  }
]

export default routes