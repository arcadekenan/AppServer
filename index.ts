import express, {Express} from 'express';
import initFirebase from './src/utils/firebase/init';
import initControllers from './src/controllers';

const initExpress = () : Express => {
    const app = express();
    app.use(express.json());
    app.listen(8080);
    return app;
}

const main = () => {
    initControllers(initExpress());
    initFirebase()
    console.log('Server Started');
}

// import WebSocket from 'ws';
// const mainService = new WebSocket.Server({
//     port: 8080,
//     perMessageDeflate: {
//         zlibDeflateOptions: {
//             // See zlib defaults.
//             chunkSize: 1024,
//             memLevel: 7,
//             level: 3
//         },
//         zlibInflateOptions: {
//             chunkSize: 10 * 1024
//         },
//         // Other options settable:
//         clientNoContextTakeover: true, // Defaults to negotiated value.
//         serverNoContextTakeover: true, // Defaults to negotiated value.
//         serverMaxWindowBits: 10, // Defaults to negotiated value.
//         // Below options specified as default values.
//         concurrencyLimit: 10, // Limits zlib concurrency for perf.
//         threshold: 1024 // Size (in bytes) below which messages
//         // should not be compressed.
//     }
// });

// mainService.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         console.log('received: %s', message);
//         if (message === "oq?") {
//             ws.send('tambem não sei...')
//         }
//     });
//     ws.send('something');

//     setTimeout(() => {
//        ws.send('YEY IT WORKS')
//     }, 5000);
// });

main();
