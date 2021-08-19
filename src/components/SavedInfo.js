import React from 'react'
import '../components/SavedInfo.css'

const SavedInfo = props => {

    return (
        <div style={props.style} className='infoContainer'>
            <div className='iconCont'>
                <i className="far fa-times-circle" onClick={props.close}></i>
                {/* <i class="fas fa-check-double"></i> */}
            </div>

            {
                props.isEvent ?
                    props.event.map((element, index) =>
                        <div className='info' key={index}>
                            <i className="fas fa-check-double done-icon" onClick={()=>props.ackReminder(index,props.event)}></i>
                            <p className='title'>{element.title}</p>
                            <p className='date'>{element.date} - {element.endDate}</p>
                            <p className='mail'>{element.reply_to}</p>
                            <p className='description'>{element.description}</p>
                        </div>
                    )
                    :
                    props.reminder.map((element, index) =>
                        <div className='info' key={index}>
                            <i className="fas fa-check-double done-icon" onClick={()=>props.ackReminder(index,props.reminder)}></i>
                            <p className='title'>{element.title}</p>
                            <p className='date'>{element.date}</p>
                            <p className='mail'>{element.reply_to}</p>
                            <p className='description'>{element.description}</p>
                        </div>
                    )
            }
        </div>
    )
}

export default SavedInfo
