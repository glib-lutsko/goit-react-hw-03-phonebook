import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const LOCAL_KEY = 'phoneContacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_KEY)
    );
    if (contactsFromLocalStorage) {
      this.setState({ contacts: contactsFromLocalStorage });
    }
  }

  componentDidUpdate(_, prevState) {
    console.log(12321);
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
