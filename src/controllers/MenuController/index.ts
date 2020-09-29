import {Express} from 'express';
import {createSession, joinSession} from '../../interactors/MenuInteractor'
import {
    IHostSessionRequest, 
    IHostSessionResponse, 
    IJoinSessionRequest, 
    IJoinSessionResponse,
} from './interface';

const hostGame = (app : Express) => {
    app.post('/hostSession', async (req, res) => {
        const requestBody = req.body as IHostSessionRequest
        let responseBody: IHostSessionResponse = { status: "tryAgain" }

        try {
            const sessionCode = await createSession(requestBody.hostName, requestBody.numberOfPlayers);
            responseBody = { status: 'success', sessionCode}
        } catch (error) {
            switch (error) {
                case 'sessionAlreadyCreated':
                    responseBody = { status: "sessionAlreadyCreated" }
                    break;
                default:
                    break;
            }
        }
        res.send(responseBody)
    })
}

const joinGame = (app : Express) => {
    app.post('/joinSession', async (req, res) => {
        const requestBody = req.body as IJoinSessionRequest
        let responseBody: IJoinSessionResponse = { status: "tryAgain" }

        try {
            const sessionCode = await joinSession(requestBody.name, requestBody.sessionCode);
            responseBody = { status: 'success', sessionCode }
        } catch (error) {
            switch (error) {
                case 'sessionFull':
                    responseBody = { status: "sessionFull" }
                    break;
                case 'sessionClosed':
                    responseBody = { status: "sessionClosed" }
                    break;
                case 'sessionActive':
                    responseBody = { status: "sessionOngoing" }
                    break;
                default:
                    break;
            }
        }
        res.send(responseBody)
    })
}


export default(app : Express) => {
    hostGame(app);
    joinGame(app);
};
