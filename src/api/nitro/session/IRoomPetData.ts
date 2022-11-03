export interface IRoomPetData
{
    id: number;
    level: number;
    maximumLevel: number;
    experience: number;
    levelExperienceGoal: number;
    energy: number;
    maximumEnergy: number;
    happyness: number;
    maximumHappyness: number;
    ownerId: number;
    ownerName: string;
    respect: number;
    age: number;
    unknownRarity: number;
    saddle: boolean;
    rider: boolean;
    skillTresholds: number[];
    publiclyRideable: number;
    breedable: boolean;
    fullyGrown: boolean;
    dead: boolean;
    rarityLevel: number;
    maximumTimeToLive: number;
    remainingTimeToLive: number;
    remainingGrowTime: number;
    publiclyBreedable: boolean;
    readonly adultLevel: number;
}
