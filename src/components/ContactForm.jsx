import React, { Component } from 'react'

class ContactForm extends Component{
    state = {
        name: '',
        number: '+38'
    }
    handleNameChange = (event) => {
        const {name, value} = event.currentTarget
        this.setState({ [name]: value })
        // this.props.getSomeOfName(this.state.name)
    }
    handleNumberChange = (event) => {
        const {name, value} = event.currentTarget
        this.setState({[name]: value})
    }
    onExistingContactAlert = (event) => {
        event.preventDefault()
        this.setState({name: '', number: '+38'})
        alert(this.state.name + ' уже есть в списке контактов')
    }
    
    render() {
        const { onAddNewContact } = this.props
        
        const { name, number } = this.state
        
        const existingContact = this.props.getSomeOfName(name)
    return (
            <form action="">
          <label htmlFor="">
            Name <input
              name='name'
              onChange={this.handleNameChange}
              type="text"
              value={name} />
          </label>
          <label htmlFor="">
            Number <input
              name='number'
              onChange={this.handleNumberChange}
              type="tel"
              value={number} />
          </label>
          <button
                onClick={existingContact ? this.onExistingContactAlert : (e) => {
                    onAddNewContact(e, name, number)
                    this.setState({name: '', number: '+38'})
            }}
            type='submit'>Создать</button>
        </form>
        )
    }
}

export default ContactForm;