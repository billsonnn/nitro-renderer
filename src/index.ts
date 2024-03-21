import { AbstractRenderer, BrowserAdapter, DOMAdapter, HelloSystem } from 'pixi.js';

HelloSystem.defaultOptions.hello = true;
AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat = false;
DOMAdapter.set(BrowserAdapter);

export * from '@nitrots/api';
export * from '@nitrots/assets';
export * from '@nitrots/avatar';
export * from '@nitrots/camera';
export * from '@nitrots/communication';
export * from '@nitrots/configuration';
export * from '@nitrots/events';
export * from '@nitrots/localization';
export * from '@nitrots/room';
export * from '@nitrots/session';
export * from '@nitrots/sound';
export * from '@nitrots/utils';
export * from './pixi-proxy';
