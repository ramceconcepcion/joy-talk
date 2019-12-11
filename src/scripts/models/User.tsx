import uuidv4 from 'uuid/v4';

export default class User {
    id: string;
    status: boolean;
    name: string;
    connectionTimeoutId: any;

    constructor(name) {
        this.id = uuidv4();
        this.status = true;
        this.name = name;
        this.connectionTimeoutId = null;
    }
}