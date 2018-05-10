import { CHANGE_MESSAGE } from '../constants/actions/input';

const initialState = {
    message: 'Дратути, введите что-нибудь в инпут снизу'
}

export default function main(state = initialState, action){
    switch (action.type){
        case CHANGE_MESSAGE: 
            return {
                ...state, 
                message: action.message
            };
        default: 
            return state;
    }
}

