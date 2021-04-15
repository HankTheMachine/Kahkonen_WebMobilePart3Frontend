import React from 'react';
import axios from 'axios';
const baseUrl = '/api/reminders/'

class ReminderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reminders: [],
            newReminderTime: new Date(),
            newReminderText: '',
            //vapaaId : props.vapaaId
        }
        this.asetaTila = props.asetaTila;
    } 
    
    componentDidMount() {
        //console.log('ReminderForm Mounttasi')
        axios.get(baseUrl).then(response => {
          this.setState({ 
            reminders: response.data,
          })
          //this.asetaVapaaId()
        })
      }

    /*
    asetaVapaaId() {
      axios.get(baseUrl).then(response => {
          let firstAvailableId = 1
          let takenIds = []
          let i = 1
          for (i=0; i<response.data.length ; i++) {
            takenIds.push(response.data[i].id)
          }
          while (takenIds.includes(firstAvailableId)) {
            firstAvailableId = firstAvailableId + 1
          }
          this.setState({
            vapaaId : firstAvailableId
         })
       })
    }
  */  

    handleReminderTextChange = (event) => {this.setState({ newReminderText: event.target.value })}
    handleReminderTimeChange = (event) => {this.setState({ newReminderTime: event.target.value })}

    addReminder = (event) => {
        event.preventDefault()
        
        const reminder = {
          text: this.state.newReminderText,
          date: new Date(this.state.newReminderTime),
          //id: this.state.vapaaId
        }

        if (reminder.date.toString()==="Invalid Date") {alert("Syötä kelvollinen aika")} 
        else if( !this.state.reminders.find(muistutus => muistutus.text === reminder.text)){ 
            axios
            .post(baseUrl, reminder)
            .then(response => {
              axios.get(baseUrl).then(response => {
                this.setState({
                  reminders: response.data
                })
                this.asetaTila({
                  newReminderText: '',
                  reminders: response.data
                })
              })
              //this.asetaVapaaId()
            })
          console.log("Muistutus vastaanotettu, muistutukset:");console.log(this.state.reminders.concat(reminder))
        } else {alert("Muistutus '"+reminder.text+"' on jo olemassa!")}
      }    

    render() {
        return (
            <div>
                <form onSubmit={this.addReminder}>
                <div>
                Muista: 
                    <input 
                    value={this.state.newReminderText} 
                    onChange={this.handleReminderTextChange}
                    /><br/>
                Aikaan: 
                    <input 
                    value={this.state.newReminderTime} 
                    onChange={this.handleReminderTimeChange}
                    />           
                </div>
                <div>
                <button type="submit">Lisää muistutus</button>
                </div>
                </form>
            </div>
            )   
    }
}

export default ReminderForm