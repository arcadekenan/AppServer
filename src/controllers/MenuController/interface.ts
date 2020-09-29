export declare interface IHostSessionRequest {
    hostName: string;
    numberOfPlayers: number;
}

export declare interface IHostSessionResponse {
    status: IHostSessionResponseStatus;
    sessionCode?: string;
}

export declare interface IJoinSessionRequest {
    name: string;
    sessionCode: string;
}

export declare interface IJoinSessionResponse {
    status: IJoinSessionResponseStatus;
    sessionCode?: string;
}

export declare type IHostSessionResponseStatus = 'success' | 'sessionAlreadyCreated' | 'tryAgain';
export declare type IJoinSessionResponseStatus = 'success' | 'sessionOngoing' | 'sessionFull' | 'sessionClosed' | 'tryAgain';