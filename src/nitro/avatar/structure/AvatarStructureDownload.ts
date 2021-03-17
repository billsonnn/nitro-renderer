import { Parser } from 'xml2js';
import { NitroLogger } from '../../../core/common/logger/NitroLogger';
import { EventDispatcher } from '../../../core/events/EventDispatcher';
import { NitroEvent } from '../../../core/events/NitroEvent';
import { IFigureSetData } from './IFigureSetData';

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
                const parser = new Parser();

                parser.parseString(request.responseText, (err: Error, results: any) =>
                {
                    if(err || !results || !results.figuredata) throw new Error('invalid_figure_data');

                    if(this._dataReceiver) this._dataReceiver._Str_1017(results.figuredata);

                    this.dispatchEvent(new NitroEvent(AvatarStructureDownload.AVATAR_STRUCTURE_DONE));
                });
            };

            request.onerror = e =>
            {
                throw new Error('invalid_avatar_figure_data');
            };
        }

        catch (e)
        {
            NitroLogger.log(e);
        }
    }
}