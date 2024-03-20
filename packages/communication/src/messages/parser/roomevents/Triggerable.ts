import { IMessageDataWrapper } from '@nitrots/api';

export class Triggerable
{
    private _stuffTypeSelectionEnabled: boolean;
    private _furniLimit: number;
    private _stuffIds: number[];
    private _id: number;
    private _stringParam: string;
    private _intParams: number[];
    private _stuffTypeId: number;
    private _stuffTypeSelectionCode: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._stuffIds = [];
        this._intParams = [];
        this._stuffTypeSelectionEnabled = wrapper.readBoolean();
        this._furniLimit = wrapper.readInt();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._stuffIds.push(wrapper.readInt());

            count--;
        }

        this._stuffTypeId = wrapper.readInt();
        this._id = wrapper.readInt();
        this._stringParam = wrapper.readString();

        count = wrapper.readInt();

        while(count > 0)
        {
            this._intParams.push(wrapper.readInt());

            count--;
        }

        this._stuffTypeSelectionCode = wrapper.readInt();
    }

    public getBoolean(index: number): boolean
    {
        return (this._intParams[index] === 1);
    }

    public get stuffTypeSelectionEnabled(): boolean
    {
        return this._stuffTypeSelectionEnabled;
    }

    public get stuffTypeSelectionCode(): number
    {
        return this._stuffTypeSelectionCode;
    }

    public set stuffTypeSelectionCode(k: number)
    {
        this._stuffTypeSelectionCode = k;
    }

    public get maximumItemSelectionCount(): number
    {
        return this._furniLimit;
    }

    public get selectedItems(): number[]
    {
        return this._stuffIds;
    }

    public get id(): number
    {
        return this._id;
    }

    public get stringData(): string
    {
        return this._stringParam;
    }

    public get intData(): number[]
    {
        return this._intParams;
    }

    public get code(): number
    {
        return 0;
    }

    public get spriteId(): number
    {
        return this._stuffTypeId;
    }
}
