import { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import SavedInfo from './components/SavedInfo';
import emailjs from 'emailjs-com';

function App() {

  const [reminderData, setReminderData] = useState([
    {
      date: 'Thu Aug 19 2021',
      title: 'Title',
      description: 'This is dummy reminder. Ignore for now.',
      reply_to: 'abcd@sggscc.ac.in',
      mailedReminder: false
    },
    {
      date: 'Fri Aug 27 2021',
      title: 'Meeting',
      description: 'Join meeting at 4pm through the link abc/ert-drt-rty.com',
      reply_to: 'abcd@gmail.com',
      mailedReminder: false
    }
  ]);

  const [eventData, setEventData] = useState([
    {
      date: 'Wed Aug 18 2021',
      endDate: 'Wed Sep 1 2021',
      title: 'Bootcamp',
      description: 'Attend bootcamp at 5pm through the link xyz.com/bootcamp.',
      reply_to: 'abcd@gmail.com',
      mailedReminder: false
    },
    {
      date: 'Tue Aug 24 2021',
      endDate: 'Fri Sep 3 2021',
      title: 'Assignment',
      description: 'Complete 10 questions of assignment.',
      reply_to: 'abcd@gmail.com',
      mailedReminder: false
    }
  ]);

  function sendMail(item) {
    const currDate = new Date();
    if (item.date === currDate.toDateString() && currDate.getHours() === 0 && currDate.getMinutes() === 1 && currDate.getSeconds() === 1) {
      if (reminderData.includes(item)) {
        const reminderDataCopy = [...reminderData];
        reminderData.map((ele,index)=>{
          if(ele===item)
          {
            reminderDataCopy[index].mailedReminder = true;
            setReminderData(reminderDataCopy);
          }
          return 0;
        })
      }
      if(eventData.includes(item)) {
          const eventDataCopy = [...eventData];
          eventData.map((ele,index)=>{
            if(ele===item)
            {
              eventDataCopy[index].mailedReminder = true;
              setEventData(eventDataCopy);
            }
            return 0;
          })
        }
        
        emailjs.send('SERVICE_ID', 'TEMPLATE_ID', item, 'USER_ID') 
        //replace SERVICE_ID , TEMPLATE_ID and USER_ID with your credentials
    }
  }

  useEffect(() => {
    setInterval(() => {
      reminderData.forEach(sendMail)
      eventData.forEach(sendMail)
    }, 1000); 
  },[])

  
  const [date, setDate] = useState(new Date());
  const [ifReminder, setIfReminder] = useState(false);
  const [ifEvent, setIfEvent] = useState(false);
  const [savedInfoStyle, setSavedInfoStyle] = useState({ top: '-50em' });
  const [savedEvent, setSavedEvent] = useState(true);

  const add_rem_handler = () => {
    setIfReminder(true);
    setIfEvent(false);
  }

  const add_event_handler = () => {
    setIfEvent(true);
    setIfReminder(false);
  }

  const back_handler = () => {
    setIfReminder(false);
    setIfEvent(false);
  }

  const add_handler = () => {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const email = document.getElementById('email');

    if (date.length > 0) {
      const eventDataCopy = [...eventData];
      eventDataCopy.unshift({
        date: date[0].toDateString(),
        endDate: date[1].toDateString(),
        title: title.value,
        description: description.value,
        reply_to: email.value
      })
      setEventData(eventDataCopy);
    }
    else {
      const reminderDataCopy = [...reminderData];
      reminderDataCopy.unshift({
        date: date.toDateString(),
        title: title.value,
        description: description.value,
        reply_to: email.value
      })
      setReminderData(reminderDataCopy);
    }

    title.value = ''
    description.value = ''
    email.value = ''
  }

  const acknowledgedReminderHander = (index, arr) => {
    const dataCopy = (arr === reminderData) ? [...reminderData] : [...eventData];
    dataCopy.splice(index, 1);
    (arr === reminderData) ? setReminderData(dataCopy) : setEventData(dataCopy);
  }

  const closeSideBarHandler = () => {
    setSavedInfoStyle({ top: '-50em' })
  }

  const showSavedEventsHandler = () => {
    if (!savedEvent)
      setSavedEvent(true)
    setSavedInfoStyle({ top: '0em' })
  }

  const showSavedRemindersHandler = () => {
    if (savedEvent)
      setSavedEvent(false)
    setSavedInfoStyle({ top: '0em' });
  }

  return (

    <div className='main_section'>

      <SavedInfo
        style={savedInfoStyle}
        reminder={reminderData}
        event={eventData}
        isEvent={savedEvent}
        ackReminder={acknowledgedReminderHander}
        close={closeSideBarHandler}
      />

      <h2 className='app_name'>NOTIFY</h2>
      <div className='reminder_container'>
        <p className='guideInfo'>{ifReminder ? 'Select a date of reminder' : ifEvent ? 'Select a range of event' : ''}</p>
        <div className="calender_container">
          <Calendar
            onChange={setDate}
            value={date}
            selectRange={ifEvent ? true : false}
          />
        </div>

        {
          ifEvent | ifReminder ?
            <div className='add_container'>
              <input type='text' placeholder='Enter Title' id='title' />
              <input type='text' placeholder='Enter Description' id='description' />
              <input type='email' placeholder='Enter Email' id='email'></input>
              <button className='btn add_btn' onClick={add_handler}>Add</button>
              <p className='backbtn' onClick={back_handler}>Back</p>
            </div>
            :
            <div className='options_container'>
              <button className='btn add_btn' onClick={add_rem_handler}>Add Reminder</button>
              <button className='btn add_btn' onClick={add_event_handler}>Add Event</button>
              <button className='btn show_btn' onClick={showSavedRemindersHandler}>Show Reminders</button>
              <button className='btn show_btn' onClick={showSavedEventsHandler}>Show Events</button>
            </div>
        }

      </div>
    </div>
  );
}

export default App;
