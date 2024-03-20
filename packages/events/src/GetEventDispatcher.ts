import { EventDispatcher } from './EventDispatcher';

const eventDispatcher = new EventDispatcher();

export const GetEventDispatcher = () => eventDispatcher;
