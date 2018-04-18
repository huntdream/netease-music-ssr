import React, { Component } from 'react'
import { resolve } from 'path'

class AudioPlayer extends Component {
  constructor() {
    super()
    this.state = {
      song: {
        id: '',
        name: '',
        url: '',
        duration: '',
        currentPlayTime: ''
      }
    }
    this._audio = React.createRef()
  }

  componentDidMount() {
    this._audio.current.play()
    console.log('Component did mount')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState)
    return {
      song: {
        ...prevState.song,
        ...nextProps.song
      }
    }
  }

  componentDidUpdate() {
    const audioNode = this._audio.current
    if (!audioNode.paused) {
      audioNode.pause()
    }
    let loadAudio = new Promise((resolve, reject) => {
      audioNode.load()

      audioNode.oncanplay = () => resolve()

      audioNode.onerror = () => reject()
    })
    loadAudio.then(result => {
      audioNode.play()
    })

    loadAudio.catch(err => console.log('Something went wrong!'))
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.song.duration === nextState.song.duration) {
    //   return true
    // }
    return true
  }

  render() {
    return (
      <div className="audio-player">
        <div className="player-name">
          <h1>{this.props.song.name}</h1>
        </div>
        <div className="player-controls">
          <a
            className="btn-controls pause"
            onClick={e => {
              e.preventDefault()
              if (this._audio.current.paused) {
                e.target.className = 'btn-controls pause'
                this._audio.current.play()
              } else {
                e.target.className = 'btn-controls play'
                this._audio.current.pause()
              }
            }}
          />
          <a
            className="btn-controls unmuted"
            onClick={e => {
              e.preventDefault()
              const audioNode = this._audio.current
              if (audioNode.muted) {
                e.target.className = 'btn-controls unmuted'
                audioNode.muted = false
              } else {
                e.target.className = 'btn-controls muted'
                audioNode.muted = true
              }
            }}
          />
          <div className="progress-bar" />
          <div className="player-duration">
            {this._audio.current ? this._audio.current.duration : '0:00'}
          </div>
        </div>
        <audio ref={this._audio}>
          <source src={this.props.song.url} />
        </audio>
      </div>
    )
  }
}

export default AudioPlayer
