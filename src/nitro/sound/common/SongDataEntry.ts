import { ISongInfo } from '../../../api';
import { PlayListEntry } from '../../communication/messages/parser/sound/PlayListEntry';

export class SongDataEntry extends PlayListEntry implements ISongInfo
{
    private _songData:string;
    private _jukeboxDiskId:number = -1;

    constructor(id:number, length:number, name:string, creator:string, songData: string = '')
    {
        super(id, length, name, creator);
        this._songData = songData;
    }

    public override get id():number
    {
        return this._id;
    }

    public override get length():number
    {
        return this._length;
    }

    public override get name():string
    {
        return this._name;
    }

    public override get creator():string
    {
        return this._creator;
    }

    public get songData():string
    {
        return this._songData;
    }

    public set songData(k:string)
    {
        this._songData = k;
    }

    public get diskId():number
    {
        return this._jukeboxDiskId;
    }

    public set diskId(k:number)
    {
        this._jukeboxDiskId = k;
    }
}
