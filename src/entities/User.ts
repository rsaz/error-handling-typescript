import { uuid } from "uuidv4";

class User {
    private id: string;
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.id = uuid();
        this.name = name;
        this.email = email;
    }

    public get Id(): string {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Email(): string {
        return this.email;
    }

    public set Email(email: string) {
        this.email = email;
    }
}

export { User };