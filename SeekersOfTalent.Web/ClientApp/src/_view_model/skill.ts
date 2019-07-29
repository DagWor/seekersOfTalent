export interface SkillViewModel {
    id?: number;
    name: string;
    description: string;
    levelOfExpertise: Expertise;
}

export interface Expertise {
    id: number;
    name: string;
}