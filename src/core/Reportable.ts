import {RunResult} from "./Runnable";

/**
 * Reportable interface for Reporters implementation, used in Runner.
 * Each Reportable need to return Promise with valid ReportResult for Logging purpose
 */
export interface Reportable{
    readonly NAME: string;
    report(result: RunResult): Promise<ReportResult>;
}

export interface ReportResult{
    success: boolean
}