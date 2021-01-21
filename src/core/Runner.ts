import {Runnable, RunResult} from "./Runnable";
import {Reportable} from "./Reportable";
import {Base} from "./Base";

export class Runner extends Base {
    tasks: Runnable[] = [];
    reporters: Reportable[] = [];
    timeout: number = 6000;
    runsCount: number = 0;
    lastRunTimestamp: number = 0;

    constructor() {
        super("RUNNER")
    }

    public init() {
        this.scheduleNextRun(this.timeout);
    }

    async run() {
        if (this.isRunning()) {
            for (let task of this.tasks) {
                const result: RunResult = await task.run();
                await this.report(result);
            }
            this.completeRun();
        }
    }

    async report(result: RunResult): Promise<any> {
        for (let reporter of this.reporters) {
            await reporter.report(result);
        }
    }

    scheduleNextRun(timeout: number) {
        setTimeout(() => this.run(), timeout);
    }

    setTimeout(timeout: number): void {
        this.timeout = timeout;
    }

    addTask(task: Runnable) {
        this.tasks.push(task);
    }

    removeTask(task: Runnable) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }

    addReporter(reporter: Reportable) {
        this.reporters.push(reporter);
    }

    removeReporter(reporter: Reportable) {
        this.reporters.splice(this.reporters.indexOf(reporter), 1);
    }

    getTask(index: number): Runnable{
        return this.tasks[index];
    }

    getReporter(index: number): Reportable{
        return this.reporters[index];
    }

    getInfo() {
        return {
            tasks: this.tasks.map((task, i) => {
                return {name: task.NAME, state: task.getState(), index: i, logsCount: task.logger.getLogsCount()}
            }),
            reporters: this.reporters.map((reporter, i) => {
                return {name: reporter.NAME, state: reporter.getState(), index: i, logsCount: reporter.logger.getLogsCount()}
            }),
            logsCount: this.logger.getLogsCount(),
            timeout: this.timeout,
            runsCount: this.runsCount,
            lastRun: this.lastRunTimestamp,
            state: this.getState()
        }
    }

    private completeRun() {
        this.runsCount++;
        this.lastRunTimestamp = Date.now()
        this.scheduleNextRun(this.timeout);
    }
}