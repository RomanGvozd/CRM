import * as api from "../../../api/users.api";

export const ACTION_ADD_CHILDREN = "ACTION_ADD_CHILDREN";
export const ACTION_DELETE_CHILDREN = "ACTION_DELETE_CHILDREN";

export function deleteItem(id) {
    return { 
        type: ACTION_DELETE_CHILDREN, 
        payload: id 
    }
}

export function createItem(name, surname, age, selected, files) {
    return { 
        type: ACTION_ADD_CHILDREN, 
        payload: { 
            name: name, 
            surname: surname, 
            age: age, 
            speciality: selected, 
            files: files,
            
        }
    }
}

export function addUser(user) {
    return function (dispatch) {
        api.addUser(user)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
}

