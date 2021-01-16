import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";
import {Client} from "onesignal-node";
import {ONE_SIGNAL} from "../config";

export class OneSignalReporter implements Reportable{
    readonly NAME: string = "ONE_SIGNAL_REPORTER";
    private client: Client = new Client(ONE_SIGNAL.APP_ID, ONE_SIGNAL.API_KEY);

    async report(result: RunResult): Promise<ReportResult> {
        if(result.notification){
            await this.client.createNotification(result.notification).catch(e => {
                console.log(e)
            });
        }

        return Promise.resolve({success: true});
    }
}