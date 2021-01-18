import {RunResult} from "./Runnable";
import {Base} from "./Base";

/**
 * Reportable interface for Reporters implementation, used in Runner.
 * Each Reportable need to return Promise with valid ReportResult for Logging purpose
 */
export interface Reportable extends Base{
    report(result: RunResult): Promise<ReportResult>;
}

export interface ReportResult{
    success: boolean
}