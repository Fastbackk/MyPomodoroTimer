import React, { Component } from 'react'

const UserContext = React.createContext();

//Provider, Consumer


export class UserProvider extends Component {
  render() {
    return (
        <UserContext.Provider>
            {this.props.childen }
        </UserContext.Provider>
      
    )
  }
}
