export function ValidateSpellPower(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void{
    const originalMethod = descriptor.value as (
        ...args: any[]
    ) => any;

    descriptor.value = function (...args: any[]){
        const spell = args[0];

        if(spell.power<0){
            throw new Error(
                "Spell power should be positive"
            );
        }
        return originalMethod.apply(this, args);
    };
}


export function Cache(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value as (
        ...args: unknown[]
    ) => unknown;

    const instanceCaches = new WeakMap<object, Map<string, unknown>>();

    descriptor.value = function (this: object, ...args: unknown[]): unknown {
        let cache = instanceCaches.get(this);

        if (!cache) {
            cache = new Map<string, unknown>();
            instanceCaches.set(this, cache);
        }
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log(`[CACHE HIT] ${String(propertyKey)}`);
            return cache.get(key);
        }

        console.log(`[CACHE MISS] ${String(propertyKey)}`);
        const result = originalMethod.apply(this, args);

        cache.set(key, result);
        return result;
    };
}