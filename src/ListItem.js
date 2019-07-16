import React from 'react'


export const ListItem = (props) => {
    
    return <li  className="list-group-item">
        <button
            className="btn-sm mr-4 btn btn-info"
            onClick={ event => props.editToDo(event, props.item.id)}
        >U</button>
        {props.item.name}
        <button
            className="btn-sm ml-4 btn btn-danger"
            onClick={(event) => props.removeToDo(event, props.item.id)}
        >X</button>
    </li>
}