import { CHANGE_MESSAGE } from '../constants/actions/input';

export function changeMessage(message){
    return {
        type: CHANGE_MESSAGE, 
        message
    }
}