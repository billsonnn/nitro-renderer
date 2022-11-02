import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { CfhSanctionTypeData } from './CfhSanctionTypeData';

export class CfhSanctionMessageParser implements IMessageParser
{
    private _issueId: number;
    private _accountId: number;
    private _sanctionType: CfhSanctionTypeData;

    public flush(): boolean
    {
        this._issueId = -1;
        this._accountId = 1;
        this._sanctionType = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._issueId = wrapper.readInt();
        this._accountId = wrapper.readInt();
        this._sanctionType = new CfhSanctionTypeData(wrapper);

        return true;
    }

    public get issueId(): number
    {
        return this._issueId;
    }

    public get accountId(): number
    {
        return this._accountId;
    }

    public get sanctionType(): CfhSanctionTypeData
    {
        return this._sanctionType;
    }
}
