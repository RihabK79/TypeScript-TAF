export interface Spell{
    name: string;
    power: number;
}
export type House =
    | "Gryffindor"
    | "Slytherin"
    | "Ravenclaw"
    | "Hufflepuff";

export interface Wizard {
    id: number;
    name: string;
    house: House;
    age: number;
}

export type AcademyEvent =
    |{
        type: "spell-cast";
        wizardId: number;
        spellName: string;
    }
    |{
        type: "wizard-registered";
        wizardId: number;
    };

export type NewWizard = Omit<Wizard, "id">;
export type SpellCastEvent = Extract<AcademyEvent, {type: "spell-cast"}>;