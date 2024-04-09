import { Container } from 'pixi.js';

const stage = new Container();

stage.interactive = false;
stage.interactiveChildren = false;
stage.eventMode = 'none';

export const GetStage = () => stage;
