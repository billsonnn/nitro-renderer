import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';


export class RoomSessionVoteEvent extends RoomSessionEvent
{
    public static VOTE_QUESTION: string = 'RSPE_VOTE_QUESTION';
    public static VOTE_RESULT: string = 'RSPE_VOTE_RESULT';

    private _question: string = '';
    private _choices: string[];
    private _SafeStr_7651: string[];
    private _SafeStr_7654: number = 0;

    constructor(_arg_1: string, _arg_2: IRoomSession, _arg_3: string, _arg_4: string[], _arg_5: string[] = null, _arg_6: number = 0)
    {
        super(_arg_1, _arg_2);

        this._choices = [];
        this._SafeStr_7651 = [];
        this._question = _arg_3;
        this._choices = _arg_4;
        this._SafeStr_7651 = _arg_5;
        if(this._SafeStr_7651 == null)
        {
            this._SafeStr_7651 = [];
        }
        this._SafeStr_7654 = _arg_6;
    }

    public get question(): string
    {
        return this._question;
    }

    public get choices(): string[]
    {
        return this._choices.slice();
    }

    public get _SafeStr_4173(): string[]
    {
        return this._SafeStr_7651.slice();
    }

    public get _SafeStr_4174(): number
    {
        return this._SafeStr_7654;
    }
}
