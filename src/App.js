import React from "react";
import "./App.css";
import List from "./list";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      way: "",
      itemList: [],
    };
  }

  handleChangeData(event) {
    this.setState({
      data: event,
    });
  }
  handleChangeWay(event) {
    this.setState({
      way: event,
    });
  }
  handelAction = ({ actionType, data }) => {
    console.log(actionType, data);
    switch (actionType) {
      case "edit":
        return this.setState({
          currentEditId: data.id,
          data: data.data,
          way: data.way,
        }); // переиминовать data в date

      case "delete":
        return this.setState((prevState) => ({
          itemList: prevState.itemList?.filter((item) => item.id != data.id),
        }));
    }
  };

  idGen = () => {
    if (!this.state.itemList.length) return 1;
    const sortItems = this.state.itemList.sort((a, b) =>
      a.id < b.id ? 1 : -1
    );
    const lastId = sortItems[0].id;
    console.log(sortItems, lastId);
    return lastId + 1;
  };

  editItem = ({ findItem, id }) => {
    if (id) {
      return this.setState((prevState) => ({
        itemList: [
          ...prevState.itemList?.filter((item) => item.id != id),
          {
            id,
            way: Number(this.state.way),
            data: this.state.data,
          },
        ],
        ...this.clearData

      }));
    }

    if (findItem) {
      return this.setState((prevState) => ({
        itemList: [
          ...prevState.itemList?.filter((item) => item.id != findItem.id),
          {
            ...findItem,
            way: findItem.way + Number(this.state.way),
          },
        ],
        ...this.clearData

      }));
    }
  };

  clearData = { way: "", data: "" };

  addItem = () => {
    if (!this.state.data && !this.state.way) return;
    const findItem = this.state.itemList.find(
      (item) => item.data === this.state.data
    );
    if (this.state.currentEditId) {
      return this.editItem({ id: this.state.currentEditId });
    }
    if (findItem) {
      return this.editItem({ findItem });
    }
    const id = this.idGen();
    this.setState({
      itemList: [
        ...this.state.itemList,
        {
          id,
          data: this.state.data,
          way: Number(this.state.way),
        },
      ],
      ...this.clearData
    });
  };

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <div className="content">
          <div style={{ display: "flex" }}>
            <label>
              Дата (ДД.ММ.ГГ)
              <br />
              <input
                type="text"
                name="data"
                value={this.state.data}
                onChange={(event) => this.handleChangeData(event.target.value)}
              />
            </label>
            <br />
            <label>
              Пройдено км
              <br />
              <input
                type="text"
                name="way"
                value={this.state.way}
                onChange={(event) => this.handleChangeWay(event.target.value)}
              />
            </label>
            <input type="submit" value="ОК" onClick={this.addItem} />
          </div>
          <List
            items={this.state.itemList.sort((a, b) =>
              a.data < b.data ? 1 : -1
            )}
            action={this.handelAction}
          />
        </div>
      </div>
    );
  }
}

export default App;
