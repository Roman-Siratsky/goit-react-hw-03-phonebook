// import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Component } from 'react';
import shortId from 'shortid'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'

const initialState = {
  contacts: [],
  filter: ''
}

class App extends Component {

  state = {
    ...initialState,
    contacts: [...initialState.contacts]
  }

  componentDidMount() {
    const localStorageContacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(localStorageContacts)
    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  handleFilterChange = (event) => {
    const { name, value } = event.currentTarget
    this.setState({[name]: value})
  }

  onDeleteContact = (contactId) => {
    this.setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }
  onAddNewContact  = (event, name, number) => {
    event.preventDefault();
    this.setState(({ contacts }) => ({
      ...this.state,
      contacts: [...contacts, {
        id: shortId.generate(),
        name,
        number,
      }]
    }))
  }

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const optimizedFilterName = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(optimizedFilterName));
  }


  getSomeOfName = (name) => {
    const optimizedContactName = name.toLowerCase();
    return this.state.contacts.some(contact => contact.name.toLowerCase() === optimizedContactName)
  }

  render() {
    const filteredContacts = this.getFilteredContacts()
    // const existingContact = this.getSomeOfName()
    
    return (
    <div className="App">
        <h1>PhoneBook</h1>
        <ContactForm
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          onExistingContactAlert={this.onExistingContactAlert}
          onAddNewContact={this.onAddNewContact}
          getSomeOfName={this.getSomeOfName}
          // existingContact={existingContact}
        />
        <h2>Contacts</h2>
        <Filter
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
        <ul>
        { this.state.contacts.length 
            ? <ContactList
              filteredContacts={filteredContacts}
              onDeleteContact={this.onDeleteContact}
            />
            : <li key={shortId.generate()}>
                <p>No saved contacts yet</p>
              </li>
          }
          </ul>
    </div>
  )
  } 
}

export default App;
