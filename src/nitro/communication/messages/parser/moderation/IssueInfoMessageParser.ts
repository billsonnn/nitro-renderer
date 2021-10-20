import { IMessageDataWrapper, IMessageParser } from '../../../../../core';
import { IssueMessageData } from './IssueMessageData';
import { PatternMatchData } from './PatternMatchData';

export  class IssueInfoMessageParser implements IMessageParser
{
    private _issueData:IssueMessageData;


    public get issueData():IssueMessageData
    {
        return this._issueData;
    }

    public flush(): boolean
    {
        this._issueData = null;
        return true;
    }

    public parse(k:IMessageDataWrapper): boolean
    {
        const _local_2: number = k.readInt();
        const _local_3: number = k.readInt();
        const _local_4: number = k.readInt();
        const _local_5: number = k.readInt();
        const _local_6: number = k.readInt();
        const _local_7: number = k.readInt();
        const _local_8: number = k.readInt();
        const _local_9: number = k.readInt();
        const _local_10: string = k.readString();
        const _local_11: number = k.readInt();
        const _local_12: string = k.readString();
        const _local_13: number = k.readInt();
        const _local_14: string = k.readString();
        const _local_15: string = k.readString();
        const _local_16: number = k.readInt();
        const _local_17: number = k.readInt();
        const _local_18:PatternMatchData[] = [];
        let _local_19 = 0;
        while(_local_19 < _local_17)
        {
            _local_18.push(new PatternMatchData(k));
            _local_19++;
        }
        this._issueData = new IssueMessageData(_local_2, _local_3, _local_4, _local_5, _local_6, _local_7, _local_8, _local_9, _local_10, _local_11, _local_12, _local_13, _local_14, _local_15, _local_16, _local_18);
        return true;
    }
}
