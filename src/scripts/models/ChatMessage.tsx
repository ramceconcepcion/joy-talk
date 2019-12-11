import uuidv4 from 'uuid/v4';

export default class ChatMessage {
    id: string;
    name: string;
    content: any;
    timestamp: any;
    type: any;

    constructor(id, name, content, type) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.timestamp = new Date().getTime();
        this.type = type || "text";
    }
}