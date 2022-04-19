export default class User {
    constructor(public id: string, public username: string, public discriminator: string, public bot: boolean) {}
}