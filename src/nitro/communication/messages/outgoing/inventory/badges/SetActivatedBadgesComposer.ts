import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class SetActivatedBadgesComposer implements IMessageComposer<any[]>
{
    private _badges: string[] = [];

    public getMessageArray()
    {
        const data = [];

        for(let i = 0; i < this._badges.length; i++)
        {
            if(i <= this._badges.length)
            {
                data.push(i + 1);
                data.push(this._badges[i]);
            }
            else
            {
                data.push(i + 1);
                data.push('');
            }
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
