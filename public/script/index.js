import { initializeUI } from "./uiStuff.js";
import { initSocket } from "./socketStuff.js";

initializeUI();

(async () => {
  await initSocket();
})();
