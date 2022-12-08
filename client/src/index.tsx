import React from "react";
import DxDbeApp from "./DxDbe/DxDbeRoot";
import { createRoot } from 'react-dom/client';
import './../common/prototypes.extensions'


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<DxDbeApp />);