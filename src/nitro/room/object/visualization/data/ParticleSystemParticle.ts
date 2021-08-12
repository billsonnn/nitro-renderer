import { IGraphicAsset } from '../../../../../room';

export interface ParticleSystemParticle
{
    isEmitter?: boolean;
    lifeTime?: number;
    fade?: boolean;
    frames?: IGraphicAsset[];
}
