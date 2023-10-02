import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
const LOCAL_KEY = 'phoneContacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length < contacts.length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
    this.setState({ contacts });
  }

  handleAddContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
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
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <h1>Contacts</h1>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
