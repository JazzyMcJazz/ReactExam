export class User {

    constructor(
        public email: string,
        public idToken?: string | null,
        public refreshToken?: string | null,
        public displayName?: string | null,
        public imageUrl?: string | null
    ) {
    }
}