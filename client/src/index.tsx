import React from "react";
import DxDbeApp from "./DxDbe/index.tsx";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<DxDbeApp />);