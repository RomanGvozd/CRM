import * as api from "../../../api/group.api";

export const ACTION_ADD_GROUP = "ACTION_ADD_GROUP";
export const ACTION_DELETE_GROUP = "ACTION_DELETE_GROUP";
export const ACTION_ADD_GROUP_CHILDREN = "ACTION_ADD_GROUP_CHILDREN";
export const ACTION_DELETE_GROUP_CHILDREN = "ACTION_DELETE_GROUP_CHILDREN";
export const ACTION_OPEN_GROUP_ID = "ACTION_OPEN_GROUP_ID";

export function deleteItem(id) {
    return { 
        type: ACTION_DELETE_GROUP, 
        idGroup: id 
    }
}

export function deleteChildrenGroup(childrenId, groupId) {
    return { 
        type: ACTION_DELETE_GROUP_CHILDREN, 
        idGroupChildren: {
            childrenId,
            groupId,
        }
    }
}

export function createItem(name, category, selected) {
    return { 
        type: ACTION_ADD_GROUP, 
        payloadGroup: {
            id: Date.now(), 
            name: name, 
            category: category, 
            selected: selected,
            showChildren: false
        }
    }
}

export function addChildren(idAddChildren, id, name, surname, age, speciality, files) {
    return { 
        type: ACTION_ADD_GROUP_CHILDREN, 
        idAddChildren: idAddChildren,
        payloadChildren: {
            id: id, 
            name: name, 
            surname: surname, 
            age: age, 
            speciality: speciality, 
            files: files
        }
    }
}

export function openGroupId(id) {
    return { 
        type: ACTION_OPEN_GROUP_ID, 
        idGroupOpen: id 
    }
}

export function addGroup(group) {
    return function (dispatch) {
        api.addGroup(group)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
}
