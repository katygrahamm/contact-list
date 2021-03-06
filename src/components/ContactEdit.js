import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

class ContactEdit extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      name: '',
      phone: '',
      email: '',
      image: ''
    }

    this.handleSubmitContactClick = this.handleSubmitContactClick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  // To prevent any side effects in the constructor, use the componentDidMount function
  componentDidMount () {
    // Find the contact key by creating a function that takes in key
    const findContactByKey = (key) => {
      // The function returns the filter method on the contacts array
      return this.props.contacts.filter((contact) => {
        // Filter out and return the contact key that matches the key passed in
        return contact.key === key
      });
    };
    // Set the current contact to the invoked findContactByKey function and pass in
    // the contactKey of the first indexed item in the contacts array
    const currentContact = findContactByKey(this.props.contactKey)[0];

    // Set the state to the currentContact's information
    this.setState({
      name: currentContact.name,
      phone: currentContact.phone,
      email: currentContact.email,
      image: currentContact.image,
      key: currentContact.key
    })
  }

  handleSubmitContactClick () {
    // Function will be invoked on submit button click
    const newContact = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      image: this.state.image,
      key: this.state.key
    };

    // Check the validity of the input and empty fields
    if(this.state.name ==='') {
      alert('Name is a required field')
    } else if(!isNaN(this.state.name)) {
      alert('Name cannot be a number')
    } else if (!this.state.email.includes('@')){
      alert('Please enter a valid email')
    } else if (this.state.email === '') {
      alert('Email is a required field')
    } else if (isNaN(this.state.phone) || this.state.phone.toString().length !== 10) {
      alert('Please enter a valid phone number')
    } else if (this.state.phone === ''){
      alert('Phone number is a required field')
    } else {
      // If the input is valid invoke the update contact function and pass in the new contact
      this.props.updateContact(newContact)
      // Bring the user back to the contacts page on submit
      this.props.history.push('/contacts')
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Edit Contact</h1>
        <br></br>
        <form className="col-md-6 offset-md-3">
          <h2>{this.state.name}</h2>
          <input type='text' className='form-control player' defaultValue={this.state.name} onChange={event =>
            this.setState({ name: event.target.value })}/>

          <br></br>

          <h4>{this.state.phone}</h4>
          <input type='text' className='form-control player' defaultValue={this.state.phone} onChange={event =>
            this.setState({ phone: event.target.value })}/>

          <br></br>

          <h4>{this.state.email}</h4>
          <input type='text' className='form-control player' defaultValue={this.state.email} onChange={event =>
            this.setState({ email: event.target.value })}/>

          <br></br>

          <div>
            <img src={this.state.image} alt="" height='auto' width='300'/>
            <br></br>
            <br></br>
            <input type='text' className='form-control player' defaultValue={this.state.image} onChange={event =>
              this.setState({ image: event.target.value })}/>
          </div>
          <br></br>
          <button type="button" className="btn btn-info" onClick={this.handleSubmitContactClick}>Submit</button>
          <br></br>
          <Link to='/contacts' className="text-info">Back to Contacts</Link>
        </form>
      </div>
    )
  }
}

// Add proptypes to benefit myself and other devs working on this code in the future
ContactEdit.propTypes = {
  contact: PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  contacts: PropTypes.array.isRequired,
  updateContact: PropTypes.func.isRequired,
  contactKey: PropTypes.number
};

export default ContactEdit
