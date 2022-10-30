import { IAssetManager, ICommunicationManager, IDisposable } from '../api';
import { IConfigurationManager } from './configuration/IConfigurationManager';

export interface INitroCore extends IDisposable
{
    configuration: IConfigurationManager;
    asset: IAssetManager;
    communication: ICommunicationManager;
}
