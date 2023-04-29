import React from 'react'

export default function ListBody(props) {
    return (
        <div className="listBody">
            {props.todos.map((myWork) => {
                return (
                    <div>{myWork}</div>
                )
            })}
        </div>
    )
}
