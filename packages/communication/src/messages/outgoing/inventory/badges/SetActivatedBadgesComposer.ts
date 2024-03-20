import { IMessageComposer } from '@nitrots/api';

export class SetActivatedBadgesComposer implements IMessageComposer<any[]>
{
    private _badges: string[] = [];

    public getMessageArray()
    {
        const data = [];

        for(let i = 1; i <= this._badges.length; i++)
        {
            data.push(i);
            data.push(this._badges[i - 1]);
        }

        return data;
    }

    public dispose(): void
    {
        return;
    }

    public addActivatedBadge(badge: string): void
    {
        this._badges.push(badge);
    }
}
