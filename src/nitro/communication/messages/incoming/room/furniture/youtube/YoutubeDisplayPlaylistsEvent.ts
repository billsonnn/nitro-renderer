import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { YoutubeDisplayPlaylistsMessageParser } from '@/nitro'

export class YoutubeDisplayPlaylistsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, YoutubeDisplayPlaylistsMessageParser)
  }

  public getParser(): YoutubeDisplayPlaylistsMessageParser {
    return this.parser as YoutubeDisplayPlaylistsMessageParser
  }
}
