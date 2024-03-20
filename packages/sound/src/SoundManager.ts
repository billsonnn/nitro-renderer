import { IAdvancedMap, IMusicController, INitroEvent, ISoundManager } from '@nitrots/api';
import { GetConfiguration } from '@nitrots/configuration';
import { GetEventDispatcher, NitroSettingsEvent, NitroSoundEvent, RoomEngineEvent, RoomEngineObjectEvent, RoomEngineSamplePlaybackEvent } from '@nitrots/events';
import { AdvancedMap, NitroLogger } from '@nitrots/utils';
import { MusicController } from './music/MusicController';

export class SoundManager implements ISoundManager
{
    private _volumeSystem: number = 0.5;
    private _volumeFurni: number = 0.5;
    private _volumeTrax: number = 0.5;

    private _internalSamples: IAdvancedMap<string, HTMLAudioElement> = new AdvancedMap();
    private _furniSamples: IAdvancedMap<number, HTMLAudioElement> = new AdvancedMap();
    private _furnitureBeingPlayed: IAdvancedMap<number, number> = new AdvancedMap();

    private _musicController: IMusicController = new MusicController();

    public async init(): Promise<void>
    {
        this._musicController.init();

        GetEventDispatcher().addEventListener<RoomEngineSamplePlaybackEvent>(RoomEngineSamplePlaybackEvent.PLAY_SAMPLE, event => this.onEvent(event));
        GetEventDispatcher().addEventListener<RoomEngineObjectEvent>(RoomEngineObjectEvent.REMOVED, event => this.onEvent(event));
        GetEventDispatcher().addEventListener<RoomEngineEvent>(RoomEngineEvent.DISPOSED, event => this.onEvent(event));
        GetEventDispatcher().addEventListener<NitroSettingsEvent>(NitroSettingsEvent.SETTINGS_UPDATED, event => this.onEvent(event));
        GetEventDispatcher().addEventListener<NitroSoundEvent>(NitroSoundEvent.PLAY_SOUND, event => this.onEvent(event));
    }

    private onEvent(event: INitroEvent)
    {
        switch(event.type)
        {
            case RoomEngineSamplePlaybackEvent.PLAY_SAMPLE: {
                const castedEvent = (event as RoomEngineSamplePlaybackEvent);

                this.playFurniSample(castedEvent.objectId, castedEvent.sampleId, castedEvent.pitch);
                return;
            }
            case RoomEngineObjectEvent.REMOVED: {
                const castedEvent = (event as RoomEngineObjectEvent);

                this.stopFurniSample(castedEvent.objectId);
                return;
            }
            case RoomEngineEvent.DISPOSED: {
                this._furnitureBeingPlayed.getKeys().forEach((objectId: number) =>
                {
                    this.stopFurniSample(objectId);
                });
                return;
            }
            case NitroSettingsEvent.SETTINGS_UPDATED: {
                const castedEvent = (event as NitroSettingsEvent);

                const volumeFurniUpdated = castedEvent.volumeFurni !== this._volumeFurni;
                const volumeTraxUpdated = castedEvent.volumeTrax !== this._volumeTrax;

                this._volumeSystem = (castedEvent.volumeSystem / 100);
                this._volumeFurni = (castedEvent.volumeFurni / 100);
                this._volumeTrax = (castedEvent.volumeTrax / 100);

                if(volumeFurniUpdated) this.updateFurniSamplesVolume(this._volumeFurni);

                if(volumeTraxUpdated) this._musicController?.updateVolume(this._volumeTrax);

                return;
            }
            case NitroSoundEvent.PLAY_SOUND: {
                const castedEvent = (event as NitroSoundEvent);

                this.playInternalSample(castedEvent.sampleCode);
                return;
            }
        }
    }

    private playSample(sample: HTMLAudioElement, volume: number, pitch: number = 1): void
    {
        sample.volume = volume;
        sample.currentTime = 0;

        try
        {
            sample.play();
        }
        catch (e)
        {
            NitroLogger.error(e);
        }
    }

    private playInternalSample(code: string): void
    {
        let sample = this._internalSamples.getValue(code);

        if(!sample)
        {
            const sampleUrl = GetConfiguration().getValue<string>('sounds.url');

            sample = new Audio(sampleUrl.replace('%sample%', code));
            this._internalSamples.add(code, sample);
        }

        this.playSample(sample, this._volumeSystem);
    }

    private playFurniSample(objectId: number, code: number, pitch: number): void
    {
        let sample = this._furniSamples.getValue(code);

        if(!sample)
        {
            const sampleUrl = GetConfiguration().getValue<string>('external.samples.url');

            sample = new Audio(sampleUrl.replace('%sample%', code.toString()));
            this._furniSamples.add(code, sample);
        }

        if(!this._furnitureBeingPlayed.hasKey(objectId)) this._furnitureBeingPlayed.add(objectId, code);

        sample.onended = event => this.stopFurniSample(objectId);

        sample.onpause = event => this.stopFurniSample(objectId);

        sample.onerror = event => this.stopFurniSample(objectId);

        this.playSample(sample, this._volumeFurni, pitch);
    }

    private stopInternalSample(code: string): void
    {
        const sample = this._internalSamples.getValue(code);

        if(!sample) return;

        try
        {
            sample.pause();
        }
        catch (e)
        {
            NitroLogger.error(e);
        }
    }

    private stopFurniSample(objectId: number): void
    {
        const furnitureBeingPlayed = this._furnitureBeingPlayed.getValue(objectId);

        if(!furnitureBeingPlayed) return;

        const sample = this._furniSamples.getValue(furnitureBeingPlayed);

        this._furnitureBeingPlayed.remove(objectId);

        if(!sample) return;

        try
        {
            sample.pause();
        }
        catch (e)
        {
            NitroLogger.error(e);
        }
    }

    private updateInternalSamplesVolume(volume: number): void
    {
        this._internalSamples.getValues().forEach((sample: HTMLAudioElement) =>
        {
            sample.volume = volume;
        });
    }

    private updateFurniSamplesVolume(volume: number): void
    {
        this._furniSamples.getValues().forEach((sample: HTMLAudioElement) =>
        {
            sample.volume = volume;
        });
    }

    public get traxVolume(): number
    {
        return this._volumeTrax;
    }

    public get musicController(): IMusicController
    {
        return this._musicController;
    }
}
