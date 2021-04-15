import React from 'react';

import './ReminderApp.css';
import DisplayReminder from './Components/DisplayReminder'
import ReminderForm from './Components/ReminderForm.js'

import axios from 'axios'
const baseUrl = '/api/reminders/'

class ReminderApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reminders: [
        
      ],
      //vapaaId: 1
    }
  }

  paivitaTila() {
    axios
      .get(baseUrl)
      .then(response => {
        /*
        let firstAvailableId = 1
        let takenIds = []
        let i = 1
        for (i=0; i<response.data.length ; i++) {
          takenIds.push(response.data[i].id)
        }
        while (takenIds.includes(firstAvailableId)) {
          firstAvailableId = firstAvailableId + 1
        }
        */
        this.setState({ 
          reminders: response.data,
          //vapaaId : firstAvailableId
        })
      })
  }

  componentDidMount() {
    this.paivitaTila()
  }
  

  render() {
    return (
      <div>
        <h2>Lisää muistutus:</h2>
        <ReminderForm 
          muistutukset={this.state.reminders} 
          asetaTila={this.paivitaTila.bind(this)} 
          //vapaaId={this.state.vapaaId}
        />
        <br/>
        <h2>Muista:</h2>    
         {this.state.reminders.map(reminder =>
           <DisplayReminder key ={reminder.id} reminder={reminder} asetaTila={this.paivitaTila.bind(this)} />
         )}
      </div>
    )
  }
}

export default ReminderApp;
