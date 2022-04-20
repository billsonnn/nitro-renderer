import { NitroVersion } from '../../../../../core';
import { ClientDeviceCategoryEnum } from '../../../../../core/communication/connections/enums/ClientDeviceCategoryEnum';
import { ClientPlatformEnum } from '../../../../../core/communication/connections/enums/ClientPlatformEnum';
import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ClientHelloMessageComposer implements IMessageComposer<ConstructorParameters<typeof ClientHelloMessageComposer>>
{
    private _data: ConstructorParameters<typeof ClientHelloMessageComposer>;

    constructor(releaseVersion: string, type: string, platform: number, category: number)
    {
        this._data = [ `NITRO-${ NitroVersion.RENDERER_VERSION.replaceAll('.', '-') }`, 'HTML5', ClientPlatformEnum.HTML5, ClientDeviceCategoryEnum.BROWSER ];
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
