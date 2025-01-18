import { GetRoomEngine } from './GetRoomEngine';
import { RoomPreviewer } from './RoomPreviewer';

export const GetRoomPreviewerInstance = () => new RoomPreviewer(GetRoomEngine(), ++RoomPreviewer.PREVIEW_COUNTER);
