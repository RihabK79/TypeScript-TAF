import { WizardRepository } from "./repository";
import type { SpellCastEvent, House, Wizard } from "./types";
import { SpellRepository} from "./repository";
import { Cache } from './decorators';


const wizardRepository = new WizardRepository();
const wizard1 = wizardRepository.addWizard({
    name: "Harry Potter",
    house: "Gryffindor",
    age: 11
});

const wizard2 = wizardRepository.addWizard({
    name: "Hermione Granger",
    house: "Slytherin",
    age: 11
});

const gryffindorWizards = wizardRepository.findByHouse("Slytherin");

console.log(wizard1);
console.log(wizard2);
console.log(gryffindorWizards);

function handleSpellCast(event: SpellCastEvent): void{
    console.log(
        `Wizard ${event.wizardId} cast ${event.spellName}`
    );
}

handleSpellCast({
    type: "spell-cast",
    wizardId: 1,
    spellName: "Expelliarmus"
});

const spellRepository = new SpellRepository();
spellRepository.add({
    name: "Expelliarmus",
    power: 10
});
console.log("Valid spell added");

try{
    spellRepository.add({
        name: "invalid spell",
        power: -5
    });
}catch(error){
    console.log(error instanceof Error ? error.message : error);
}

class SpellCalculator{
    @Cache
    calculatePower(basePower: number, multiplier: number): number{
        console.log("Calculating... ");

        return basePower * multiplier;
    }
}
const calculator = new SpellCalculator();

console.log(calculator.calculatePower(10, 3));
console.log(calculator.calculatePower(5, 2));

function isHouse(value: string): value is House{
    return [
        "Gryffindor",
        "Slytherin",
        "Ravenclaw",
        "Hufflepuff"
    ].includes(value);
}

console.log(isHouse("Gryffindor"));
console.log(isHouse("Durmstrang"));

function isWizard(value: unknown): value is Wizard{
    if(typeof value !== "object" || value == null){
        return false;
    }
    const candidate = value as Record<string, unknown>;
    return (
        typeof candidate.id === "number" &&
        typeof candidate.name === "string" &&
        isHouse(candidate.house) &&
        typeof candidate.level === "number" &&
        typeof candidate.active == "boolean"
    );
}

const validWizard = {
    id: 1,
    name: "Harry Potter",
    house: "Gryffindor",
    age: 11
};

const invalidWizard = {
    id: 2,
    name: "Viktor",
    house: "Durmstrang",
    age: 17
};

console.log(isWizard(validWizard));
console.log(isWizard(invalidWizard));



