import { IEventDispatcher } from '../api';
import { EventDispatcher } from './EventDispatcher';

export const NitroEventDispatcher: IEventDispatcher = new EventDispatcher();
