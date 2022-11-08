import { TraxChannel } from './TraxChannel';
import { TraxChannelItem } from './TraxChannelItem';

export class TraxData
{
    private _channels: TraxChannel[];
    private _metaData: Map<string, string>;

    constructor(data: string)
    {
        this._channels = [];
        this._metaData = new Map<string, string>();

        let channelLines: string[] = [];

        const lines: string[] = data.split(':');
        const lastLine: string = lines[lines.length - 1];

        if(lastLine.indexOf('meta') > -1)
        {
            const metaData: string[] = lastLine.split(';');

            for(const meta of metaData)
            {
                const metaAttributes: string[] = meta.split(',');
                this._metaData.set(metaAttributes[0], metaAttributes[1]);
            }

            channelLines = lines.slice(0, lines.length - 1);
        }
        else
        {
            channelLines = lines;
        }

        for(let i = 0; i < channelLines.length / 2; i++)
        {
            if(channelLines[i * 2].length > 0)
            {
                const channelId: number = parseInt(channelLines[i * 2]);
                const channelItemSets: string[] = channelLines[(i * 2) + 1].split(';');

                const channel: TraxChannel = new TraxChannel(channelId);

                for(const channelItemSet of channelItemSets)
                {
                    const channelItemData: string[] = channelItemSet.split(',');

                    if(channelItemData.length !== 2) return;

                    channel.addChannelItem(new TraxChannelItem(parseInt(channelItemData[0]), parseInt(channelItemData[1])));
                }

                this._channels.push(channel);
            }
        }
    }

    public get channels(): TraxChannel[]
    {
        return this._channels;
    }

    public getSampleIds(): number[]
    {
        const ids: number[] = [];

        for(const channel of this._channels)
        {
            for(const item of channel.items)
            {
                if(ids.indexOf(item.id) === -1) ids.push(item.id);
            }
        }

        return ids;
    }

    public get hasMetaData(): boolean
    {
        return this._metaData.has('meta');
    }

    public get metaCutMode(): boolean
    {
        return this._metaData.has('c');
    }

    public get metaTempo(): number | null
    {
        const tempo = this._metaData.get('t');

        if(!tempo) return null;

        return parseInt(tempo);
    }
}
