import { IMessageComposer } from '@nitrots/api';

export class PerformanceLogMessageComposer implements IMessageComposer<ConstructorParameters<typeof PerformanceLogMessageComposer>>
{
    private _data: ConstructorParameters<typeof PerformanceLogMessageComposer>;

    constructor(k: number, userAgent: string, flashVersion: string, operatingSystem: string, cpuArchitecture: string, isDebugger: boolean, totalMemory: number, _arg_8: number, gcCount: number, averageUpdateInterval: number, slowUpdateCount: number)
    {
        this._data = [k, userAgent, flashVersion, operatingSystem, cpuArchitecture, isDebugger, totalMemory, _arg_8, gcCount, averageUpdateInterval, slowUpdateCount];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
