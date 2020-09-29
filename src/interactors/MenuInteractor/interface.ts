export declare interface ISession {
    sessionCode: string;
    sessionStatus: ISessionStatus;
    numberOfPlayers: number;
    players?: any;
}

export declare interface IPlayer {
    playerName: string;
    playerType: 'host' | 'guest';
}

export declare type ISessionStatus = 'queue' | 'active' | 'closed';

export enum ICreateSessionStatus {
    SESSION_ALREADY_CREATED = 'sessionAlreadyCreated',
}

export enum IJoinSessionStatus {
    SESSION_FULL = 'sessionFull',
    SESSION_CLOSED = 'sessionClosed',
    SESSION_ACTIVE = 'sessionActive',
}

