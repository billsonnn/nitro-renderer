import { IAssetManager } from './asset/IAssetManager';
import { IDisposable } from './common/disposable/IDisposable';
import { ICommunicationManager } from './communication/ICommunicationManager';
import { IConfigurationManager } from './configuration/IConfigurationManager';

export interface INitroCore extends IDisposable
{
    configuration: IConfigurationManager;
    asset: IAssetManager;
    communication: ICommunicationManager;
}
