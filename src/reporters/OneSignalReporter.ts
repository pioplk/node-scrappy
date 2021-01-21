import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";
import {Client} from "onesignal-node";
import {ONE_SIGNAL} from "../config";
import {State} from "../core/State";
import {Base} from "../core/Base";

export class OneSignalReporter extends Base implements Reportable{
    private client: Client = new Client(ONE_SIGNAL.APP_ID, ONE_SIGNAL.API_KEY);

    constructor() {
        super("ONE_SIGNAL_REPORTER")
    }
    async report(result: RunResult): Promise<ReportResult> {
        if(result.notification && this.isRunning()){
            this.logger.info(JSON.stringify(result.notification));

            await this.client.createNotification(result.notification).catch(e => {
                this.logger.error(JSON.stringify(e));
                this.setState(State.ERROR);
            });
        }

        return Promise.resolve({success: !this.isError()});
    }
}