import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class SetActivatedBadgesComposer implements IMessageComposer<any[]>
{
    private _badges: string[] = [];

    public getMessageArray()
    {
        const data = [];
        let local2 = 1;
        while(local2 <= 5)
        {
            if(local2 <= this._badges.length)
            {
                data.push(local2);
                data.push(this._badges[(local2 - 1)]);
            }
            else
            {
                data.push(local2);
                data.push('');
            }

            local2++;
        }
        return data;
    }

    public dispose(): void
    {
        return;
    }

    public addActivatedBadge(badge: string): void
    {
        if(this._badges.length >= 5) return;

        this._badges.push(badge);
    }
}
