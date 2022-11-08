export interface ISongInfo
{
    //get loaded():boolean;
    get id():number;
    get diskId():number;
    set diskId(id: number);
    get length():number;
    get name():string;
    get creator():string;
    get songData():string;
    //get soundObject():IHabboSound;
}
