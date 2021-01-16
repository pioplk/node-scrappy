import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";
import {State} from "../core/State";
import {Base} from "../core/Base";

export class LogReporter extends Base implements Reportable{
    readonly NAME: string = "LOG_REPORTER";

    constructor() {
        super();
        this.setState(State.RUNNING);
    }

    report(result: RunResult): Promise<ReportResult> {
        if(this.state === State.RUNNING){
            console.log(`${new Date().toISOString()} ${result.name}: notification: ${JSON.stringify(result.notification)}, data: ${JSON.stringify(result.data)}`);
        }
        return Promise.resolve({success: true});
    }
}