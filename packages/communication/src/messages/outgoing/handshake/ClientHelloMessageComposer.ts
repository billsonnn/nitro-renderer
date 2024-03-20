import { ClientDeviceCategoryEnum, ClientPlatformEnum, IMessageComposer } from '@nitrots/api';
import { NitroVersion } from '@nitrots/utils';

export class ClientHelloMessageComposer implements IMessageComposer<ConstructorParameters<typeof ClientHelloMessageComposer>>
{
    private _data: ConstructorParameters<typeof ClientHelloMessageComposer>;

    constructor(releaseVersion: string, type: string, platform: number, category: number)
    {
        this._data = [`NITRO-${NitroVersion.RENDERER_VERSION.replaceAll('.', '-')}`, 'HTML5', ClientPlatformEnum.HTML5, ClientDeviceCategoryEnum.BROWSER];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
