import {State} from "./State";

export class Base{
    protected state!: State;

    protected setState(state: State): void{
        this.state = state;
    }

    public getState(): State{
        return this.state;
    }
}