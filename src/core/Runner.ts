import {Runnable, RunResult} from "./Runnable";
import {Reportable} from "./Reportable";
import {Base} from "./Base";
import {State} from "./State";

export class Runner extends Base{
    tasks: Runnable[] = [];
    reporters: Reportable[] = [];
    timeout: number = 5000;
    runsCount: number = 0;
    lastRunTimestamp: number = 0;

    public init(){
        this.scheduleNextRun(this.timeout);
        this.setState(State.RUNNING)
    }

    async run(){
        if(this.getState() === State.RUNNING){
            for(let task of this.tasks){
                const result: RunResult = await task.run();
                await this.report(result);
            }
            this.completeRun();
        }
    }

    private completeRun(){
        this.runsCount++;
        this.lastRunTimestamp = Date.now()
        this.scheduleNextRun(this.timeout);
    }

    async report(result: RunResult): Promise<any>{
        for(let reporter of this.reporters){
            await reporter.report(result);
        }
    }

    scheduleNextRun(timeout: number){
        setTimeout(()=> this.run(), timeout);
    }

    setTimeout(timeout: number): void{
        this.timeout = timeout;
    }

    addTask(task: Runnable){
        this.tasks.push(task);
    }

    removeTask(task: Runnable){
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }

    addReporter(reporter: Reportable){
        this.reporters.push(reporter);
    }

    removeReporter(reporter: Reportable){
        this.reporters.splice(this.reporters.indexOf(reporter), 1);
    }

    setReporterState(state: State, index: number){
        this.reporters[index].setState(state);
    }

    setTaskState(state: State, index: number){
        this.tasks[index].setState(state);
    }

    getInfo(){
        return{
            tasks: this.tasks.map((task, i) => {return { name: task.NAME, state: task.getState(), index: i}}),
            reporters: this.reporters.map((reporter, i) => {return {name: reporter.NAME, state: reporter.getState(), index: i}}),
            timeout: this.timeout,
            runsCount: this.runsCount,
            lastRun: this.lastRunTimestamp,
            state: this.getState()
        }
    }
}