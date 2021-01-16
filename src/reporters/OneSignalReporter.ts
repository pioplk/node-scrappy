import {Reportable, ReportResult} from "../core/Reportable";
import {RunResult} from "../core/Runnable";
import {Client} from "onesignal-node";
import {ONE_SIGNAL} from "../config";
import {State} from "../core/State";
import {Base} from "../core/Base";

export class OneSignalReporter extends Base implements Reportable{
    readonly NAME: string = "ONE_SIGNAL_REPORTER";
    private client: Client = new Client(ONE_SIGNAL.APP_ID, ONE_SIGNAL.API_KEY);

    constructor() {
        super();
        this.setState(State.RUNNING);
    }
    async report(result: RunResult): Promise<ReportResult> {
        if(result.notification && this.state === State.RUNNING){
            await this.client.createNotification(result.notification).catch(e => {
                console.log(e)
                this.setState(State.ERROR);
            });
        }

        return Promise.resolve({success: this.state !== State.ERROR});
    }
}