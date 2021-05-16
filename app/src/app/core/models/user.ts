import {Identifiable} from './identifiable';

export interface User extends Identifiable {
    email: string;
    firstName?: string;
    lastName?: string;
}
