class Character{
    // singleton character so you can only create one (?)
    // character needs to have an image, how to p5
    static #instance = null;
    constructor() {
        if (Character.instance) {
            return Character.#instance;
        }
        Character.#instance = this;
    }
}