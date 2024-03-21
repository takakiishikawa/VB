import React from 'react';
import {createRoot} from 'react-dom/client';
import Routes from './views/routes';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Routes />);
