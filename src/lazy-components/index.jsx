import { lazy } from 'react';
// import LoadingScreen from '../views/LoadingScreen';

const LazyHome = lazy(async () => await import('../views/Home'))
const LazyAboutUs = lazy(async () => await import('../views/AboutUs'))
const LazyServices = lazy(async () => await import('../views/Services'))
const LazyJobs = lazy(async () => await import('../views/Jobs'))
const LazyContact = lazy(async () => await import('../views/Contact'))

export { LazyHome, LazyAboutUs, LazyServices, LazyJobs, LazyContact }
