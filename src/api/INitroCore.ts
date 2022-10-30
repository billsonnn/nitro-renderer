import { IAssetManager } from './asset';
import { IDisposable } from './common';
import { ICommunicationManager } from './communication';
import { IConfigurationManager } from './configuration';

export interface INitroCore extends IDisposable
{
    configuration: IConfigurationManager;
    asset: IAssetManager;
    communication: ICommunicationManager;
}
