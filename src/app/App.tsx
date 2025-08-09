import { type JSX } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { router } from './router';
import { Toaster } from 'react-hot-toast';
import { TOAST_DEFAULT_CONFIG } from '@/shared/config';

function App(): JSX.Element {
	return (
		<HelmetProvider>
			<Helmet>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
			</Helmet>
			<RouterProvider router={router} />
			<Toaster toastOptions={TOAST_DEFAULT_CONFIG} />
		</HelmetProvider>
	);
}

export default App;
