import {State} from "./State";
import {Logger} from "./Logger";

export class Base{
    readonly NAME: string;
    protected state: State = State.RUNNING;
    public logger: Logger;

    constructor(name: string) {
        this.NAME = name;
        this.logger = new Logger(this.NAME);
        this.logger.info(`${this.NAME} initialized`);
    }

    public setState(state: State): void{
        this.state = state;
        this.logger.warning(`State changed to: ${state}`)
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