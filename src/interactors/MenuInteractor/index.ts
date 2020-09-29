import RTDB from '../../utils/firebase/realTimeDB';
import {
    ISession, 
    ISessionStatus, 
    IPlayer, 
    IJoinSessionStatus, 
    ICreateSessionStatus
} from './interface';

const createUUID = () => {
    let nowDate = new Date().getTime();
    return 'xxxxxx'.replace(/[xy]/g, (char) => {
        const random = (nowDate + Math.random() * 16) % 16 | 0;
        return(char == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    })
}

const validateSession = (sessionStatus : ISessionStatus) : boolean => sessionStatus === 'queue';

const validateNumberOfPlayers = (players : any, numberOfPlayers : number) => 
    Object.keys(players).length === numberOfPlayers || 
    Object.keys(players).length >= numberOfPlayers ? false : true;

const validatePlayerName = (newPlayerName : string, players : any) : string => {
    const hasSameName = Object.keys(players).filter(key => players[key].playerName.includes(newPlayerName))
    if (hasSameName.length > 0) {
        return newPlayerName + ' ' + (hasSameName.length + 1);
    } else {
        return newPlayerName;
    }
}

export const createSession = async (hostName : string, numberOfPlayers : number) : Promise < string > => {
    const UUID = createUUID();
    const hostPlayer: IPlayer = {
        playerName: hostName,
        playerType: 'host'
    }
    const session: ISession = {
        sessionCode: UUID,
        sessionStatus: 'queue',
        numberOfPlayers,
    }
    try {
        const checkDB = await RTDB.readData(UUID);
        if (! checkDB.val()) {
            await RTDB.writeData(session, UUID);
            await RTDB.writeArray([hostPlayer], UUID, 'players')
        } else {
            return Promise.reject(ICreateSessionStatus.SESSION_ALREADY_CREATED);
        }
        return Promise.resolve(UUID);
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const joinSession = async (playerName : string, sessionCode : string) : Promise < string > => {
    try {
        const session = await RTDB.readData(sessionCode);
        const sessionObj = session.val() as ISession;
        if (session.val()) {
            if (validateSession(sessionObj.sessionStatus)) {
                if (validateNumberOfPlayers(sessionObj.players!, sessionObj.numberOfPlayers)) {
                    const newPlayer: IPlayer = {
                        playerName: validatePlayerName(playerName, sessionObj.players!),
                        playerType: 'guest'
                    }
                    await RTDB.updateArrayData(newPlayer, sessionObj.sessionCode, 'players');
                } else {                    
                    return Promise.reject(IJoinSessionStatus.SESSION_FULL);
                }
            } else {
                return Promise.reject(
                    sessionObj.sessionStatus === 'active' ? 
                    IJoinSessionStatus.SESSION_ACTIVE : IJoinSessionStatus.SESSION_CLOSED
                );
            }
        }
        return Promise.resolve(sessionObj.sessionCode);
    } catch (error) {
        console.log(error);
        
        return Promise.reject(error.message);
    }
}
