import {Runnable, RunResult} from "./Runnable";
import {Reportable, ReportResult} from "./Reportable";

export class Runner{
    tasks: Runnable[] = [];
    reporters: Reportable[] = [];
    timeout: number = 60000;
    runsCount: number = 0;

    public init(){
        this.scheduleNextRun(this.timeout);
        console.log("Runner initialized")
    }

    async run(){
        const timestamp = Date.now();

        for(let task of this.tasks){
            const result: RunResult = await task.run(timestamp);
            await this.report(result);
        }

        this.runsCount++;
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

    getInfo(){
        return{
            tasks: this.tasks.map(task => {return { name: task.NAME, state: task.getState()}}),
            reporters: this.reporters.map(reporter => {return {name: reporter.NAME, state: reporter.getState()}}),
            timeout: this.timeout,
            runsCount: this.runsCount,
        }
    }
}