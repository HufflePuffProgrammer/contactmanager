import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: "Mia Malkova",
        email: "mia@gmail.com",
        phone: "111-111-1111"
      },
      {
        id: 2,
        name: "Alexa Grace",
        email: "alexa@gmail.com",
        phone: "222-222-2222"
      },
      {
        id: 3,
        name: "Tori Black",
        email: "tori@gmail.com",
        phone: "333-333-3333"
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  };
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({
      contacts: res.data
    });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
