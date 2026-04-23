import React from 'react';
import ReactDOM from 'react-dom/client'

import './assets/css/swiper.css';
import './assets/css/navigation.css';
import './assets/css/pagination.css';
import './assets/css/index.css'

import { createHashRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'

const router = createHashRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
