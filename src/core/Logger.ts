export enum LogType{
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR ='ERROR'
}

export interface Log{
    type: LogType;
    message: string;
}

export class Logger{
    protected name: string;
    protected logs: Log[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public info(msg: string): void{
        const message = `${new Date().toISOString()} ${this.name}: ${msg}`;
        this.addLog(message, LogType.INFO);
    }

    public error(msg: string): void{
        const message = `${new Date().toISOString()} ${this.name}: ${msg}`;
        this.addLog(message, LogType.ERROR);
    }

    public warning(msg: string): void{
        const message = `${new Date().toISOString()} ${this.name}: ${msg}`;
        this.addLog(message, LogType.WARNING);
    }

    public getLastLog(): Log{
        return this.logs[this.logs.length - 1];
    }

    public getLogs(type?: LogType): Log[]{
        return type ? this.logs.filter(log => log.type === type) : this.logs;
    }

    public getLogsCount(): number{
        return this.logs.length;
    }

    public clearLogs(type?: LogType): void{
        this.logs = type ? this.logs.filter(log => log.type !== type) : [];
    }

    private addLog(message: string, type: LogType = LogType.INFO,){
        this.logs.push({type, message});
    }
}