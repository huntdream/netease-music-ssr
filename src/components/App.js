import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import AudioPlayer from './AudioPlayer'
import NavBar from './NavBar'
import routes from '../routes'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      song: {
        url: '',
        name: '',
        id: ''
      }
    }
    this.fetchSong = this.fetchSong.bind(this)
  }

  componentDidMount() {}

  fetchSong(name, id) {
    console.log(id)
    return fetch(`http://localhost:3000/song?id=${id}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          song: {
            id: id,
            name: name,
            url: data.data[0].url
          }
        })
      )
  }

  render() {
    return (
      <React.Fragment>
        <div className="nav">
          <NavBar />
        </div>
        <div className="container">
          {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={props => <C {...props} {...rest} />}
            />
          ))}
        </div>
        {/* <AudioPlayer /> */}
      </React.Fragment>
    )
  }
}

export default App
