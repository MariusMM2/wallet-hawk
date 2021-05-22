import {tassign} from 'tassign';
import {DataActions} from '../actions/data.actions';
import {DataState} from '../core.store';
import {AnyAction} from 'redux';

const INITIAL_STATE: DataState = {
    categoryList: [
        {
            id: '0',
            label: 'Home'
        },
        {
            id: '1',
            label: 'Hygiene'
        },
        {
            id: '2',
            label: 'Electronics'
        },
        {
            id: '3',
            label: 'Groceries'
        },
        {
            id: '4',
            label: 'Fast Food'
        }
    ],
    galleryList: null,
    receipts: null,
    budgetItemList: [
        {
            id: '1',
            name: 'thing 1',
            description: 'sadsadsafsafa',
            totalPrice: -10023,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '0',
                    label: 'Home'
                },
                {
                    id: '1',
                    label: 'Hygiene'
                },
                {
                    id: '2',
                    label: 'Electronics'
                },
                {
                    id: '3',
                    label: 'Groceries'
                },
                {
                    id: '4',
                    label: 'Fast Food'
                }
            ]
        },
        {
            id: '2',
            name: 'thing 2',
            description: 'sdasdsadasd',
            totalPrice: -10222,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '0',
                    label: 'Home'
                },
                {
                    id: '1',
                    label: 'Hygiene'
                },
                {
                    id: '2',
                    label: 'Electronics'
                },
                {
                    id: '3',
                    label: 'Groceries'
                }
            ]
        },
        {
            id: '3',
            name: 'thing 3',
            description: 'dsasdasadsadsad',
            totalPrice: -104444,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '0',
                    label: 'Home'
                },
                {
                    id: '1',
                    label: 'Hygiene'
                },
                {
                    id: '2',
                    label: 'Electronics'
                }
            ]
        },
        {
            id: '4',
            name: 'thing 4',
            description: 'asdsadsaddasasd',
            totalPrice: 410000,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '1',
                    label: 'Hygiene'
                },
                {
                    id: '2',
                    label: 'Electronics'
                },
                {
                    id: '3',
                    label: 'Groceries'
                },
                {
                    id: '4',
                    label: 'Fast Food'
                }
            ]
        },
        {
            id: '5',
            name: 'thing 5',
            description: 'saddasfsafa',
            totalPrice: -123456,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '2',
                    label: 'Electronics'
                },
                {
                    id: '3',
                    label: 'Groceries'
                },
                {
                    id: '4',
                    label: 'Fast Food'
                }
            ]
        },
        {
            id: '6',
            name: 'thing 6',
            description: 'sadsdasdasdadsadsdsa',
            totalPrice: -10000,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '2',
                    label: 'Electronics'
                }
            ]
        },
        {
            id: '7',
            name: 'thing 7',
            description: 'saddasasdasd',
            totalPrice: -12345,
            quantity: 1,
            date: new Date(),
            categoryList: [
                {
                    id: '3',
                    label: 'Groceries'
                },
                {
                    id: '4',
                    label: 'Fast Food'
                }
            ]
        },
        {
            id: '8',
            name: 'thing 8',
            description: '',
            totalPrice: -123,
            quantity: 1,
            date: new Date(),
            categoryList: []
        },
        {
            id: '9',
            name: 'thing 9',
            description: '',
            totalPrice: 10050,
            quantity: 1,
            date: new Date(),
            categoryList: []
        },
        {
            id: '10',
            name: 'thing 10',
            description: '',
            totalPrice: 1112350,
            quantity: 1,
            date: new Date(),
            categoryList: []
        },
    ],
    recurrenceList: null,
    user: {
        budgetItems: [
            {
                id: '100',
                name: 'thing 100',
                description: 'sadsadsafsafa',
                totalPrice: 123456,
                quantity: 1,
                date: new Date(),
                categoryList: []
            },
            {
                id: '200',
                name: 'thing 200',
                description: 'sdasdsadasd',
                totalPrice: -123456,
                quantity: 1,
                date: new Date(),
                categoryList: []
            },
            {
                id: '300',
                name: 'thing 300',
                description: 'dsasdasadsadsad',
                totalPrice: -123456,
                quantity: 1,
                date: new Date(),
                categoryList: []
            },
            {
                id: '400',
                name: 'thing 400',
                description: 'asdsadsaddasasd',
                totalPrice: -123456,
                quantity: 1,
                date: new Date(),
                categoryList: []
            }
        ],
        goal: null
    }
};

/**
 * Redux Reducer that manages the part of the state responsible
 * for application data.
 */
export function dataReducer(state: DataState = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case DataActions.INITIALIZE_DATA:
            return tassign(state, {
                categoryList: action.payload.categoryList,
                galleryList: action.payload.galleryList,
                receipts: action.payload.receipts,
                budgetItemList: action.payload.budgetItemList,
                recurrenceList: action.payload.recurrenceList,
                user: action.payload.user
            });
        default:
            return state;
    }

}
