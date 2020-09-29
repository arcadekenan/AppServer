import firebase from 'firebase/'

const writeData = async (data: any, to: string): Promise<any> => {
    const result = () => new Promise(res => res());    
    return await firebase.database().ref('/' +to).set(data, result);
}

const writeArray = async (array: any[], to: string, at: string): Promise<any> => {
    const promiseArray: any[] = []
    array.forEach(async data => {
        promiseArray.push(await firebase.database().ref(to+'/'+at).push().set(data, () => new Promise(res => res())));
    });
    return Promise.all(promiseArray)
}

const readData = async (from: string) => {
    return await firebase.database().ref(from).once("value");
}

const updateStaticData = async (data: any, from: string, at: string): Promise<any> => {
    const result = () => new Promise(res => res());
    return await firebase.database().ref(from).child(at).set(data, result);
}

const updateArrayData = async (data: any, from: string, at: string): Promise<any> => {
    const result = () => new Promise(res => res());
    return await firebase.database().ref(from+'/'+at).push().set(data, result);
}

const RTDB = {
    writeData,
    writeArray,
    readData,
    updateStaticData,
    updateArrayData,
}

export default RTDB;