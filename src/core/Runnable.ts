/**
 * Runnable interface for Tasks implementation, used in Runner.
 * Each Runnable need to return Promise with valid RunResult for Reporting purpose
 */

export interface Runnable{
    run(timestamp: number): Promise<RunResult>;
}

export interface RunResult{
    taskName: string;
    notify: boolean
    data?: any
}
