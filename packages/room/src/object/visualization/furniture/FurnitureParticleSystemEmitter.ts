import { IGraphicAsset, IVector3D } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';
import { ParticleSystemParticle } from '../data';
import { FurnitureParticleSystemParticle } from './FurnitureParticleSystemParticle';

export class FurnitureParticleSystemEmitter extends FurnitureParticleSystemParticle
{
    public static CONE: string = 'cone';
    public static PLANE: string = 'plane';
    public static SPHERE: string = 'sphere';

    private _name: string;
    private _roomObjectSpriteId: number = -1;
    private _force: number;
    private _timeStep: number = 0.1;
    private _gravity: number;
    private _airFriction: number;
    private _explosionShape: string;
    private _particleConfigurations: ParticleSystemParticle[];
    private _particles: FurnitureParticleSystemParticle[];
    private _maxNumberOfParticles: number;
    private _particlesPerFrame: number;
    private _emittedParticles: number;
    private _fuseTime: number = 10;
    private _energy: number = 1;
    private _hasIgnited: boolean = false;
    private _burstPulse: number = 1;
    private _emitterDirection: IVector3D;

    constructor(name: string = '', spriteId: number = -1)
    {
        super();

        this._particles = [];
        this._name = name;
        this._roomObjectSpriteId = spriteId;
        this._particleConfigurations = [];
    }

    public dispose(): void
    {
        for(const k of this._particles) k.dispose();

        this._particles = null;
        this._particleConfigurations = null;

        super.dispose();
    }

    public setup(maxNumOfParticles: number, particlesPerFrame: number, force: number, direction: IVector3D, gravity: number, airFriction: number, explosionShape: string, energy: number, fuseTime: number, burstPulse: number): void
    {
        this._maxNumberOfParticles = maxNumOfParticles;
        this._particlesPerFrame = particlesPerFrame;
        this._force = force;
        this._emitterDirection = direction;
        this._emitterDirection.normalize();
        this._gravity = gravity;
        this._airFriction = airFriction;
        this._explosionShape = explosionShape;
        this._fuseTime = fuseTime;
        this._energy = energy;
        this._burstPulse = burstPulse;
        this.reset();
    }

    public reset(): void
    {
        for(const particle of this._particles) particle.dispose();

        this._particles = [];
        this._emittedParticles = 0;
        this._hasIgnited = false;

        this.init(0, 0, 0, this._emitterDirection, this._force, this._timeStep, this._fuseTime, true);
    }

    public copyStateFrom(emitter: FurnitureParticleSystemEmitter, scale: number): void
    {
        super.copy(emitter, scale);

        this._force = emitter._force;
        this._emitterDirection = emitter._emitterDirection;
        this._gravity = emitter._gravity;
        this._airFriction = emitter._airFriction;
        this._explosionShape = emitter._explosionShape;
        this._fuseTime = emitter._fuseTime;
        this._energy = emitter._energy;
        this._burstPulse = emitter._burstPulse;
        this._timeStep = emitter._timeStep;
        this._hasIgnited = emitter._hasIgnited;
    }

    public configureParticle(lifeTIme: number, isEmitter: boolean, frames: IGraphicAsset[], fade: boolean): void
    {
        const particle: ParticleSystemParticle = {};

        particle.lifeTime = lifeTIme;
        particle.isEmitter = isEmitter;
        particle.frames = frames;
        particle.fade = fade;

        this._particleConfigurations.push(particle);
    }

    protected ignite(): void
    {
        this._hasIgnited = true;

        if(this._emittedParticles < this._maxNumberOfParticles)
        {
            if(this.age > 1) this.releaseParticles(this, this.direction);
        }
    }

    private releaseParticles(particle: FurnitureParticleSystemParticle, direction: IVector3D = null): void
    {
        if(!direction) direction = new Vector3d();

        const newDirection = new Vector3d();
        const randomParticle = this.getRandomParticleConfiguration();

        let i = 0;

        while(i < this._particlesPerFrame)
        {
            switch(this._explosionShape)
            {
                case FurnitureParticleSystemEmitter.CONE:
                    newDirection.x = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    newDirection.y = -(Math.random() + 1);
                    newDirection.z = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    break;
                case FurnitureParticleSystemEmitter.PLANE:
                    newDirection.x = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    newDirection.y = 0;
                    newDirection.z = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    break;
                case FurnitureParticleSystemEmitter.SPHERE:
                    newDirection.x = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    newDirection.y = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    newDirection.z = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    break;
            }

            newDirection.normalize();

            const newParticle = new FurnitureParticleSystemParticle();

            let lifeTime = 0;
            let isEmitter = false;
            let fade = false;
            let frames: IGraphicAsset[] = [];

            if(randomParticle)
            {
                lifeTime = Math.floor(((Math.random() * randomParticle.lifeTime) + 10));
                isEmitter = randomParticle.isEmitter;
                frames = randomParticle.frames;
                fade = randomParticle.fade;
            }
            else
            {
                lifeTime = Math.trunc(Math.floor(((Math.random() * 20) + 10)));
                isEmitter = false;
                frames = [];
            }

            newParticle.init(particle.x, particle.y, particle.z, newDirection, this._energy, this._timeStep, lifeTime, isEmitter, frames, fade);

            this._particles.push(newParticle);
            this._emittedParticles++;

            i++;
        }
    }

    private getRandomParticleConfiguration(): ParticleSystemParticle
    {
        const index: number = Math.trunc(Math.floor((Math.random() * this._particleConfigurations.length)));

        return this._particleConfigurations[index];
    }

    public update(): void
    {
        super.update();

        this.accumulateForces();
        this.verlet();
        this.satisfyConstraints();

        if(!this.isAlive && (this._emittedParticles < this._maxNumberOfParticles))
        {
            if((this.age % this._burstPulse) === 0) this.releaseParticles(this, this.direction);
        }
    }

    public verlet(): void
    {
        if(this.isAlive || (this._emittedParticles < this._maxNumberOfParticles))
        {
            const x = this.x;
            const y = this.y;
            const z = this.z;

            this.x = (((2 - this._airFriction) * this.x) - ((1 - this._airFriction) * this.lastX));
            this.y = ((((2 - this._airFriction) * this.y) - ((1 - this._airFriction) * this.lastY)) + ((this._gravity * this._timeStep) * this._timeStep));
            this.z = (((2 - this._airFriction) * this.z) - ((1 - this._airFriction) * this.lastZ));
            this.lastX = x;
            this.lastY = y;
            this.lastZ = z;
        }

        const particles: FurnitureParticleSystemParticle[] = [];

        for(const particle of this._particles)
        {
            particle.update();

            const x = particle.x;
            const y = particle.y;
            const z = particle.z;
            particle.x = (((2 - this._airFriction) * particle.x) - ((1 - this._airFriction) * particle.lastX));
            particle.y = ((((2 - this._airFriction) * particle.y) - ((1 - this._airFriction) * particle.lastY)) + ((this._gravity * this._timeStep) * this._timeStep));
            particle.z = (((2 - this._airFriction) * particle.z) - ((1 - this._airFriction) * particle.lastZ));
            particle.lastX = x;
            particle.lastY = y;
            particle.lastZ = z;

            if((particle.y > 10) || !particle.isAlive) particles.push(particle);
        }

        for(const particle of particles)
        {
            if(particle.isEmitter)
            {
                //
            }

            this._particles.splice(this._particles.indexOf(particle), 1);

            particle.dispose();
        }
    }

    private satisfyConstraints(): void
    {
    }

    private accumulateForces(): void
    {
        for(const k of this._particles)
        {
            //
        }
    }

    public get particles(): FurnitureParticleSystemParticle[]
    {
        return this._particles;
    }

    public get hasIgnited(): boolean
    {
        return this._hasIgnited;
    }

    private randomBoolean(k: number): boolean
    {
        return Math.random() < k;
    }

    public get roomObjectSpriteId(): number
    {
        return this._roomObjectSpriteId;
    }
}
