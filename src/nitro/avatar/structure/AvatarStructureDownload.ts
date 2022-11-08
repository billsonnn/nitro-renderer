import { IFigureSetData, NitroLogger } from '../../../api';
import { EventDispatcher } from '../../../core';
import { NitroEvent } from '../../../events';

export class AvatarStructureDownload extends EventDispatcher
{
    public static AVATAR_STRUCTURE_DONE: string = 'AVATAR_STRUCTURE_DONE';

    private _dataReceiver: IFigureSetData;

    constructor(downloadUrl: string, dataReceiver: IFigureSetData)
    {
        super();

        this._dataReceiver = dataReceiver;

        this.download(downloadUrl);
    }

    private download(url: string): void
    {
        const request = new XMLHttpRequest();

        try
        {
            request.open('GET', url);

            request.send();

            request.onloadend = e =>
            {
                const response = request.responseText;

                if(!response || !response.length) throw new Error('invalid_figure_data');

                if(this._dataReceiver) this._dataReceiver.appendJSON(JSON.parse(response));

                this.dispatchEvent(new NitroEvent(AvatarStructureDownload.AVATAR_STRUCTURE_DONE));
            };

            request.onerror = e =>
            {
                throw new Error('invalid_avatar_figure_data');
            };
        }

        catch (e)
        {
            NitroLogger.error(e);
        }
    }
}
