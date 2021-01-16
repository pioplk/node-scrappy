import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";
import {Client} from "onesignal-node";
import {ONE_SIGNAL} from "../config";

export class OneSignalReporter implements Reportable{
    private client: Client = new Client(ONE_SIGNAL.APP_ID, ONE_SIGNAL.API_KEY);

    async report(result: RunResult): Promise<ReportResult> {
        if(result.notify){
            await this.client.createNotification(result.data.notification);
        }

        return Promise.resolve({success: true});
    }
}