import { ACTION_ADD_CHILDREN, ACTION_DELETE_CHILDREN} from "../actions/actions";

const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, { type, payload}) {

    switch (type) {
        case ACTION_ADD_CHILDREN:
            return [...state, { ...payload }];
        case ACTION_DELETE_CHILDREN:
            return  state.filter(el => el.id !== payload ? true : false);
        default:
            return state;
    }
}