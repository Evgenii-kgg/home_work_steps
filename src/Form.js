import React from "react";
import "./App.css";

function Form (props) {

console.log(props);


    return (        
        <div style={{ display: "flex" }}>
        <label>
          Дата (ДД.ММ.ГГ)
          <br />
          <input
            type="text"
            name="data"
            value={props.data}
            onChange={(event) => props.ChangeData(event.target.value)}
          />
        </label>
        <br />
        <label>
          Пройдено км
          <br />
          <input
            type="text"
            name="way"
            value={props.way}
            onChange={(event) => props.ChangeWay(event.target.value)}
          />
        </label>
        <input type="submit" value="ОК" onClick={props.Add} />
      </div>
    )
}
export default Form;
