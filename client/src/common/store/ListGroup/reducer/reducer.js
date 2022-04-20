import { 
    ACTION_ADD_GROUP, 
    ACTION_DELETE_GROUP, 
    ACTION_ADD_GROUP_CHILDREN, 
    ACTION_OPEN_GROUP_ID,
    ACTION_DELETE_GROUP_CHILDREN
} from "../actions/actions";

const INITIAL_STATE = [];

export default function reducer(state = INITIAL_STATE, {idGroup, idGroupChildren, type, payloadGroup, payloadChildren, idGroupOpen, idAddChildren}) {

    switch (type) {
        case ACTION_ADD_GROUP:
            return [...state, { ...payloadGroup, childrens: []}];
        case ACTION_ADD_GROUP_CHILDREN:
            return state.map((group)=>{
                if(group.id === idAddChildren){
                    return {...group, childrens:[...group.childrens,  {...payloadChildren}]}
                }
                return group
            })
        case ACTION_OPEN_GROUP_ID:
            return state.map((group)=>{
                if(group.id === idGroupOpen){
                    return {...group, showChildren: !group.showChildren}
                }
                return group
            })
        case ACTION_DELETE_GROUP_CHILDREN:
            return state.map((group)=>{
                if(group.id === idGroupChildren.groupId){
                    group.childrens.map((children)=>{
                        if(children.id === idGroupChildren.childrenId){
                            return group.childrens.filter(el => el.id !== idGroupChildren.childrenId ? true : false);
                        }
                        return group
                    })
                }
                return state
            })    
        case ACTION_DELETE_GROUP:
            return state.filter(el => el.id !== idGroup ? true : false);
        default:
            return state;
    }

}
