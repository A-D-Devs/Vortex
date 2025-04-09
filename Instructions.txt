
vortex project – handleiding voor opstarten frontend en backend (lokaal)

projectstructuur:

Vortex/
├── Back_end/
│   └── server.js
├── Front_end/
│   ├── vite.config.js
│   └── src/
│       └── ChatApp.jsx
│       └── main.jsx
│   └── index.html

stap 1: backend starten (poort 25565)

1. open een terminal in de map Vortex/Back_end
2. installeer dependencies (alleen de eerste keer):

   npm install express socket.io cors

3. start de server:

   node server.js

de console moet dan tonen: "server is running on port 25565"

stap 2: frontend starten (poort 5173)

1. open een nieuwe terminal in de map Vortex/Front_end
2. installeer dependencies (alleen de eerste keer):

   npm install

   als vite nog niet is geïnstalleerd:

   npm install vite

3. controleer dat vite.config.js er zo uitziet:

   export default {
     server: {
       host: true,
       port: 5173,
     },
   };

4. start de frontend:

   npm run dev

er zal iets als dit verschijnen:

   local: http://localhost:5173/

open deze link in de browser om de app te zien.

socketverbinding in ChatApp.jsx moet verwijzen naar:

   const socket = io('http://localhost:25565');

beide terminals moeten actief blijven tijdens gebruik. met ctrl+c stop je ze weer.
