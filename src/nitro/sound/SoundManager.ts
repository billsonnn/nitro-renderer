import { AdvancedMap, Nitro, NitroSettingsEvent, RoomEngineEvent, RoomEngineObjectEvent, RoomEngineSamplePlaybackEvent } from '../..';
import { NitroManager } from '../../core/common/NitroManager';
import { NitroSoundEvent } from '../events/NitroSoundEvent';
import { NitroEvent } from './../../core/events/NitroEvent';
import { ISoundManager } from './ISoundManager';
import { IMusicManager } from './music/IMusicManager';
import { MusicManager } from './music/MusicManager';

export class SoundManager extends NitroManager implements ISoundManager
{
    private _volumeSystem: number;
    private _volumeFurni: number;
    private _volumeTrax: number;

    private _internalSamples: AdvancedMap<string, HTMLAudioElement>;
    private _furniSamples: AdvancedMap<number, HTMLAudioElement>;
    private _furnitureBeingPlayed: AdvancedMap<number, number>;

    private _musicManager: MusicManager;

    constructor()
    {
        super();

        this._volumeSystem = 0.5;
        this._volumeFurni = 0.5;
        this._volumeTrax = 0.5;

        this._internalSamples = new AdvancedMap();
        this._furniSamples = new AdvancedMap();
        this._furnitureBeingPlayed = new AdvancedMap();

        this._musicManager = new MusicManager();

        this.onEvent = this.onEvent.bind(this);
    }

    public onInit(): void
    {
        this._musicManager.init();

        Nitro.instance.roomEngine.events.addEventListener(RoomEngineSamplePlaybackEvent.PLAY_SAMPLE, this.onEvent);
        Nitro.instance.roomEngine.events.addEventListener(RoomEngineObjectEvent.REMOVED, this.onEvent);
        Nitro.instance.roomEngine.events.addEventListener(RoomEngineEvent.DISPOSED, this.onEvent);
        Nitro.instance.events.addEventListener(NitroSettingsEvent.SETTINGS_UPDATED, this.onEvent);
        Nitro.instance.events.addEventListener(NitroSoundEvent.PLAY_SOUND, this.onEvent);
    }

    public onDispose(): void
    {
        if(this._musicManager)
        {
            this._musicManager.dispose();
            this._musicManager = null;
        }

        Nitro.instance.roomEngine.events.removeEventListener(RoomEngineSamplePlaybackEvent.PLAY_SAMPLE, this.onEvent);
        Nitro.instance.roomEngine.events.removeEventListener(RoomEngineObjectEvent.REMOVED, this.onEvent);
        Nitro.instance.roomEngine.events.removeEventListener(RoomEngineEvent.DISPOSED, this.onEvent);
        Nitro.instance.events.removeEventListener(NitroSettingsEvent.SETTINGS_UPDATED, this.onEvent);
        Nitro.instance.events.removeEventListener(NitroSoundEvent.PLAY_SOUND, this.onEvent);
    }

    private onEvent(event: NitroEvent)
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

                this._volumeSystem = (castedEvent.volumeSystem / 100);
                this._volumeFurni = (castedEvent.volumeFurni / 100);
                this._volumeTrax = (castedEvent.volumeTrax / 100);

                if(volumeFurniUpdated) this.updateFurniSamplesVolume(this._volumeFurni);
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
            console.log(e);
        }
    }

    private playInternalSample(code: string): void
    {
        let sample = this._internalSamples.getValue(code);

        if(!sample)
        {
            const sampleUrl = Nitro.instance.getConfiguration<string>('sounds.url');

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
            const sampleUrl = Nitro.instance.getConfiguration<string>('external.samples.url');

            sample = new Audio(sampleUrl.replace('%sample%', code.toString()));
            this._furniSamples.add(code, sample);
        }

        if(!this._furnitureBeingPlayed.hasKey(objectId)) this._furnitureBeingPlayed.add(objectId, code);

        sample.onended = (event) =>
        {
            this.stopFurniSample(objectId);
        };

        sample.onpause = (event) =>
        {
            this.stopFurniSample(objectId);
        };

        sample.onerror = (event) =>
        {
            this.stopFurniSample(objectId);
        };

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
            console.log(e);
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
            console.log(e);
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

    public get musicManager(): IMusicManager
    {
        return this._musicManager;
    }
}
