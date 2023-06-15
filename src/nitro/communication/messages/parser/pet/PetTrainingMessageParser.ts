import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetTrainingMessageParser implements IMessageParser {
  private _petId: number

  public get petId(): number {
    return this._petId
  }

  private _commands: number[]

  public get commands(): number[] {
    return this._commands
  }

  private _enabledCommands: number[]

  public get enabledCommands(): number[] {
    return this._enabledCommands
  }

  flush(): boolean {
    this._petId = -1
    this._commands = []
    this._enabledCommands = []

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._petId = wrapper.readInt()

    let commands = wrapper.readInt()

    while (commands > 0) {
      this._commands.push(wrapper.readInt())

      commands--
    }

    let enabledCommands = wrapper.readInt()

    while (enabledCommands > 0) {
      this._enabledCommands.push(wrapper.readInt())

      enabledCommands--
    }

    return true
  }
}
