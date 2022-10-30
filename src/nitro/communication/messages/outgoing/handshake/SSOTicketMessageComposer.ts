import { IMessageComposer } from '../../../../../api';

export class SSOTicketMessageComposer implements IMessageComposer<ConstructorParameters<typeof SSOTicketMessageComposer>>
{
    private _data: ConstructorParameters<typeof SSOTicketMessageComposer>;

    constructor(ticket: string, time: number)
    {
        this._data = [ticket, time];
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
