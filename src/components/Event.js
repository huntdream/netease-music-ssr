import React, { Component } from 'react'
import { fetchEvent } from '../api/fetchEvent'

class Event extends Component {
  constructor(props) {
    super(props)
    let events
    if (__isBrowser__) {
      events = window.__INITIAL_DATA__
    } else {
      events = this.props.staticContext.data
    }
    this.state = {
      events
    }
  }

  componentDidMount() {
    console.log(this.state.events)
    if (!this.state.events.length) {
      fetchEvent().then(data => {
        console.log(data)
        this.setState({
          events: data
        })
      })
    }
  }

  render() {
    return (
      <div className="events">
        {this.state.events.map((event, index) => {
          let detail = JSON.parse(event.json)
          return (
            <div className="event-wrapper  box-shadow" key={index}>
              <div className="event">
                <div className="event-time">
                  {new Date(event.eventTime).toLocaleString()}
                </div>
                <div className="event_message">{detail.msg}</div>
                {detail.song ? (
                  <div
                    className="event_name"
                    onClick={() => fetchSong(detail.song.name, detail.song.id)}
                  >
                    {detail.song.name}
                  </div>
                ) : (
                  ''
                )}
                {event.pics[0] ? (
                  <div className="event_pic">
                    <img className="event-pic" src={event.pics[0].originUrl} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Event
