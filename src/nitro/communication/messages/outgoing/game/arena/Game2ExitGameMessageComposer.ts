import { IMessageComposer } from '../../../../../../api';

export class Game2ExitGameMessageComposer implements IMessageComposer<ConstructorParameters<typeof Game2ExitGameMessageComposer>>
{
    private _data: ConstructorParameters<typeof Game2ExitGameMessageComposer>;

    constructor(exitToRoomBeforeGame = true)
    {
        this._data = [ exitToRoomBeforeGame ];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
