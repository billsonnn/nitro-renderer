import { PlayListEntry } from './PlayListEntry';

export class SongInfoEntry extends PlayListEntry
{
    private _data: string = '';

    constructor(id: number, length: number, name: string, creator: string, data: string)
    {
        super(id, length, name, creator);
        this._data = data;
    }

    public get data(): string
    {
        return this._data;
    }
}
