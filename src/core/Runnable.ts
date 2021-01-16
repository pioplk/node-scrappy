/**
 * Runnable interface for Tasks implementation, used in Runner.
 * Each Runnable need to return Promise with valid RunResult for Reporting purpose
 */
import {CreateNotificationBody} from "onesignal-node/lib/types";

export interface Runnable{
    readonly NAME: string;
    run(timestamp: number): Promise<RunResult>;
}

export interface RunResult{
    name: string;
    notification?: CreateNotificationBody | null
    data?: any
}
