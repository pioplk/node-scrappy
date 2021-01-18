import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";
import {Base} from "../core/Base";

export class LogReporter extends Base implements Reportable{
    constructor() {
        super("LOG_REPORTER")
    }

    report(result: RunResult): Promise<ReportResult> {
        if(this.isRunning() && (result.notification || result.data)){
            this.logger.log(`notification: ${JSON.stringify(result.notification)}, data: ${JSON.stringify(result.data)}`);
            console.log(this.logger.getLastLog());
        }
        return Promise.resolve({success: this.isError()});
    }
}