/**
 * Runnable interface for Tasks implementation, used in Runner.
 * Each Runnable need to return Promise with valid RunResult for Reporting purpose
 */
import {CreateNotificationBody} from "onesignal-node/lib/types";
import {Base} from "./Base";

export interface Runnable extends Base{
    readonly NAME: string;
    run(): Promise<RunResult>;
}

export interface RunResult{
    name: string;
    notification?: CreateNotificationBody | null
    data?: any
}
