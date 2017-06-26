import React from 'react'
import ReactDOM from 'react-dom'

let App

// Basic element with props and children

App = React.createElement('h1', { style: { color: 'violet' } }, 'hi class')
App = <h1 style={{ color: 'violet' }}>hi class</h1>

// Element with nested element.

App = React.createElement('h1', null, React.createElement('em', null, 'hello'))
App = <h1><em>hello</em></h1>

// Element with variable

let name = 'Alex'
App = React.createElement('h1', null, name)
App = <h1>{name}</h1>

// Element with list of children

let animals = ['cat', 'dog', 'monkey']

App = React.createElement(
  'ul',
  null,
  animals.map(animal => React.createElement('li', { key: animal }, animal))
)

App = <ul>{animals.map(animal => <li key={animal}>{animal}</li>)}</ul>

// Conditions!

3 < 4 && '3 is less than 4' // AND operator aka "Guard"
4 < 3 || '4 is not less than 3' // OR operator aka "Default"
4 < 3 ? '4 is less than 3' : '4 is not less than three' // ternary

// conditionally render text / children

let winCoinFlip = Date.now() % 2 > 0

App = (
  <div>
    <h1>{winCoinFlip ? 'You win!' : 'You lose!'}</h1>
    {!winCoinFlip && <button>Play again</button>}
  </div>
)

// works for props as well

App = <button disabled={winCoinFlip}>Play again</button>

// Basic component
// One level abstraction higher than an element
// a function that returns an element

let CustomButton

CustomButton = props =>
  React.createElement(
    'button',
    { style: { backgroundColor: props.primary ? 'chartreuse' : 'tomato' } },
    props.children
  )

CustomButton = props =>
  <button style={{ backgroundColor: props.primary ? 'chartreuse' : 'tomato' }}>
    {props.children}
  </button>

// "Render" our component into its elements

App = React.createElement(CustomButton, null, 'Click me!')
App = <CustomButton>Click me!</CustomButton>

App = (
  <div>
    <CustomButton>Click me!</CustomButton>
    <CustomButton primary>Click me!</CustomButton>
  </div>
)

// A component that encapsulates an idea

let Game = props =>
  <div>
    <h1>{props.win ? 'You win!' : 'You lose!'}</h1>
    <CustomButton primary={props.win}>Play again</CustomButton>
  </div>

App = <Game win={winCoinFlip} />

// Attach our React app to an existing DOM element

ReactDOM.render(App, document.getElementById('root'))
