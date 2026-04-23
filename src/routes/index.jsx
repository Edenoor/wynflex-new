
import Root from '../Root.jsx'
import ErrorPage from "../views/ErrorPage";
import { LazyHome, LazyAboutUs, LazyServices, LazyJobs, LazyContact } from '../lazy-components/index.jsx'
import AboutUsLoader from '../utils/AboutUsLoader.js';
import HomeLoader from '../utils/HomeLoader.js';
import Buy from '../views/Buy.jsx';

const routes = [
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: '/',
                element: <LazyHome />,
                loader: HomeLoader
            }
            , {
                path: '/quienes-somos',
                name: 'Quiénes Somos',
                element: <LazyAboutUs />,
                loader: AboutUsLoader
            }
            , {
                path: '/servicios',
                name: 'Servicios',
                element: <LazyServices />,
                // children: [
                //     {
                //         path: '/servicios/contratar',
                //         element: <Hire />
                //     }
                // ]
            },
            {
                path: '/servicios/contratar',
                element: <Buy />
            }
            , {
                path: '/empleos',
                name: 'Empleos',
                element: <LazyJobs />
            }
            , {
                path: '/contacto',
                name: 'Contacto',
                element: <LazyContact />
            }
        ]
    }
]

export default routes