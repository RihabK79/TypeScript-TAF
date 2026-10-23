import type { Wizard, NewWizard, Spell } from "./types";
import { ValidateSpellPower } from "./decorators";

export class Repository<T>{
    protected items: T[] = [];

    add(item: T): void{
        this.items.push(item);
    }

    getAll(): T[]{
        return [...this.items];
    }
}

export class WizardRepository{
    private wizards: Wizard[] = [];
    private nextId= 1;
    addWizard(wizard: NewWizard): Wizard{
        const newWizard: Wizard ={
            ...wizard,
            id: this.nextId++
        };
        this.wizards.push(newWizard);
        return newWizard;
    }

    getAll(): Wizard[]{
        return [...this.wizards];
    }

    findByHouse(house: Wizard["house"]): Wizard[]{
        return this.getAll().filter(
            wizard => wizard.house === house
        );
    }
}

export class SpellRepository extends Repository<Spell>{
    @ValidateSpellPower
    override add(spell: Spell): void{
        super.add(spell);
    }
}

