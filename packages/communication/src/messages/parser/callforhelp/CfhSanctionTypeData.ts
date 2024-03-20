import { IMessageDataWrapper } from '@nitrots/api';
import { INamed } from '../moderation';

export class CfhSanctionTypeData implements INamed
{
    private _name: string;
    private _sanctionLengthInHours: number;
    private _probationDays: number;
    private _avatarOnly: boolean;
    private _tradeLockInfo: string = '';
    private _machineBanInfo: string = '';

    constructor(wrapper: IMessageDataWrapper)
    {
        this._name = wrapper.readString();
        this._sanctionLengthInHours = wrapper.readInt();
        this._probationDays = wrapper.readInt();
        this._avatarOnly = wrapper.readBoolean();

        if(wrapper.bytesAvailable) this._tradeLockInfo = wrapper.readString();

        if(wrapper.bytesAvailable) this._machineBanInfo = wrapper.readString();
    }

    public get name(): string
    {
        return this._name;
    }

    public get sanctionLengthInHours(): number
    {
        return this._sanctionLengthInHours;
    }

    public get avatarOnly(): boolean
    {
        return this._avatarOnly;
    }

    public get tradeLockInfo(): string
    {
        return this._tradeLockInfo;
    }

    public get machineBanInfo(): string
    {
        return this._machineBanInfo;
    }
}
