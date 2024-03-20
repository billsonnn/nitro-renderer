import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class UserClassificationMessageParser implements IMessageParser
{
    private _classifiedUsersNames: Map<number, string>;
    private _classifiedUsersClass: Map<number, string>;

    public flush(): boolean
    {
        if(this._classifiedUsersNames)
        {
            this._classifiedUsersNames = new Map();
        }
        if(this._classifiedUsersClass)
        {
            this._classifiedUsersClass = new Map();
        }

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let _local_3: number;
        let _local_4: string;
        let _local_5: string;

        let count: number = wrapper.readInt();

        this._classifiedUsersNames = new Map();
        this._classifiedUsersClass = new Map();

        while(count > 0)
        {
            _local_3 = wrapper.readInt();
            _local_4 = wrapper.readString();
            _local_5 = wrapper.readString();
            this._classifiedUsersNames.set(_local_3, _local_4);
            this._classifiedUsersClass.set(_local_3, _local_5);
            count--;
        }

        return true;
    }

    public get classifiedUsernameMap(): Map<number, string>
    {
        return this._classifiedUsersNames;
    }

    public get classifiedUserTypeMap(): Map<number, string>
    {
        return this._classifiedUsersClass;
    }
}
