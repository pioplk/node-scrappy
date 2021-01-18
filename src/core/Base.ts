import {State} from "./State";
import {Logger} from "./Logger";

export class Base{
    readonly NAME: string;
    protected state: State = State.RUNNING;
    public logger: Logger;

    constructor(name: string) {
        this.NAME = name;
        this.logger = new Logger(this.NAME);
    }

    public setState(state: State): void{
        this.state = state;
    }

    public getState(): State{
        return this.state;
    }

    public isRunning(): boolean{
        return this.getState() === State.RUNNING;
    }

    public isStopped(): boolean{
        return this.getState() === State.STOPPED;
    }

    public isError(): boolean{
        return this.getState() === State.ERROR;
    }
}