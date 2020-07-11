import React from "react";
import "./App.css";

function List(props) {

    const itemList = props.items

    return (
        <div className="item-list" >
      {itemList.map((item) => (
        <div className="item" key={item.id}>
            <p className="item-data" >{item.data}</p>
            <p className="item-way">{item.way} </p>
            <p className="item-delete">Действия </p>
            <button onClick={()=> props.action({actionType:'edit', data:item})}>✎</button>
            <button onClick={()=> props.action({actionType:'delete', data:item})}>✘</button>

          </div>
      ))}
    </div>
    )
}
export default List;
