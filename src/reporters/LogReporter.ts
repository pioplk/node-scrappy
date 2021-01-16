import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";

export class LogReporter implements Reportable{
    report(result: RunResult): Promise<ReportResult> {
        console.log(`${new Date().toISOString()} ${result.taskName}: notify: ${result.notify}, data: ${JSON.stringify(result.data)}`);

        return Promise.resolve({success: true});
    }
}