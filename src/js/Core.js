/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import App from "./bundle/main/App.js";
import Runtime from "./Runtime.js";
import {} from "./lib/Movement.js";

const release = false;
const runtime = new Runtime(release);
new App(runtime);