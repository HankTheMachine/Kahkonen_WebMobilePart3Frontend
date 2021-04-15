import { render } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
const baseUrl = '/api/reminders/'

class DisplayReminder extends React.Component {
  constructor (props) {
    super (props);
    this.asetaTila = props.asetaTila;
    this.aika = new Date(props.reminder.date).toLocaleString()
    this.key = props.reminder.id
    this.text = props.reminder.text
  }

  componentDidMount() {render()} // tämä on olemassa vain koska konsoli valitti ettei render() -funktiota kutsuta koskaan

  painaNappia = (event) => {
    event.preventDefault()
    if (window.confirm("Haluatko varmasti poistaa muistutuksen "+this.text+"?")) {
      let url = (baseUrl+this.key)
      axios.delete(url).then(
        console.log("Muistutus "+this.key+ " poistettu.")
      )
      axios
        .get(baseUrl)
        .then(response =>
          this.asetaTila({
          reminders: response.data
          })      
        )
      }
  }  


  render() {
    return (
      <div>{this.aika + " " + this.text} <form onSubmit={this.painaNappia}><button type="submit">Poista</button></form>      
      </div>
    )
  }
}  

export default DisplayReminder