import React from 'react';

const ContactList = (props) => {
    return (
        props.filteredContacts.map((contact, index) => {
            return (
              <li key={contact.id}>
                <p>{index + 1 + ') ' + contact.name + " : " + contact.number}</p>
                <button onClick={() => props.onDeleteContact(contact.id)} type='button'>Удалить</button>
              </li>
            )
          })
    )
}

export default ContactList;