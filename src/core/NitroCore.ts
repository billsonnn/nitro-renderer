import { ICommunicationManager, IConfigurationManager, INitroCore } from '@/api'
import { Disposable } from './common'
import { CommunicationManager } from './communication'
import { ConfigurationManager } from './configuration'
import { NitroVersion } from './NitroVersion'

export class NitroCore extends Disposable implements INitroCore {
  constructor() {
    super()

    NitroVersion.sayHello()

    this._configuration = new ConfigurationManager()
    this._communication = new CommunicationManager()
  }

  private _configuration: IConfigurationManager

  public get configuration(): IConfigurationManager {
    return this._configuration
  }

  private _communication: ICommunicationManager

  public get communication(): ICommunicationManager {
    return this._communication
  }

  protected onDispose(): void {
    if (this._communication) {
      this._communication.dispose()

      this._communication = null
    }
  }
}
