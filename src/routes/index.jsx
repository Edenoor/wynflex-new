import Root from '../Root.jsx'
import ErrorPage from "../views/ErrorPage"
import { LazyHome, LazyAboutUs, LazyServices, LazyJobs, LazyContact } from '../lazy-components/index.jsx'
import Buy from '../views/Buy.jsx'
import { ImmersiveEffect, MessageEffect, FeaturesEffect, StatsEffect } from '../components/Immersive'
import SmoothScrollProvider from '../components/Scroll/SmoothScrollProvider'

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
        /*
         * ImmersiveEffect, MessageEffect y FeaturesEffect todavía
         * necesitan Lenis (scroll-scrub largo). SmoothScrollProvider
         * crea UNA instancia acá, scopeada a esta ruta — así el resto
         * del sitio (Home, AboutUs, etc.) sigue con scroll nativo,
         * sin efectos colaterales de este refactor.
         */
        path: 'immersive-test',
        element: (
          <SmoothScrollProvider>
            <main><ImmersiveEffect /></main>
          </SmoothScrollProvider>
        )
      },
      {
        path: 'message-effect',
        element: (
          <SmoothScrollProvider>
            <main><MessageEffect /></main>
          </SmoothScrollProvider>
        )
      },
      {
        path: 'features-test',
        element: (
          <SmoothScrollProvider>
            <main><FeaturesEffect /></main>
          </SmoothScrollProvider>
        )
      },
      {
        /*
         * StatsEffect no usa Lenis (scroll nativo + ScrollTrigger),
         * así que no necesita el provider.
         */
        path: 'stats-test',
        element: <main><StatsEffect /></main>
      }
    ]
  }
]

export default routes