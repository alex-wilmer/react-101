import React from 'react'
import ReactDOM from 'react-dom'

let picsApiUrl = searchTerm =>
  `https://www.reddit.com/r/pics/search.json?restrict_sr=on&q=${searchTerm}`

class Pics extends React.Component {
  state = {
    dogs: []
  }

  findPics = event => {
    if (event.target.value.length > 2) {
      fetch(picsApiUrl(event.target.value))
        .then(response => response.json())
        .then(json => {
          this.setState({
            dogs: json.data.children
              .filter(post => post.data.thumbnail)
              .map(post => <img key={post.data.id} src={post.data.thumbnail} />)
          })
        })
    }
  }

  render() {
    return (
      <div>
        <div>
          <b>Search for pictures: </b>
          <input onChange={this.findPics} />
        </div>

        <hr />

        {this.state.dogs.length === 0 &&
          <div>You haven't found any pictures 😭</div>}

        {this.state.dogs.length > 0 && this.state.dogs}
      </div>
    )
  }
}

ReactDOM.render(<Pics />, document.getElementById('root'))
