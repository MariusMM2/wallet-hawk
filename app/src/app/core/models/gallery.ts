import {Identifiable} from './identifiable';

export interface Gallery extends Identifiable {
    name: string;
    description: string;
    receiptIds: string[];
}
