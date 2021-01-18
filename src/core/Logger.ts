export class Logger{
    protected name: string;
    protected logs: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public log(msg: string): void{
        this.logs.push(`${new Date().toISOString()} ${this.name}: ${msg}`)
    }

    public getLastLog(): string{
        return this.logs[this.logs.length - 1];
    }

    public getLogs(): string[]{
        return this.logs;
    }

    public getLogsCount(): number{
        return this.logs.length;
    }

    public clearLogs(): void{
        this.logs = [];
    }
}