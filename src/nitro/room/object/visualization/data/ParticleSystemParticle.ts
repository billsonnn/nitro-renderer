import { IGraphicAsset } from '../../../../../api';

export interface ParticleSystemParticle
{
    isEmitter?: boolean;
    lifeTime?: number;
    fade?: boolean;
    frames?: IGraphicAsset[];
}
