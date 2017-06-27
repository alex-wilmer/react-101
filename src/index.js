import React from 'react'
import ReactDOM from 'react-dom'

let App

// Basic element with props and children

App = React.createElement('h1', { style: { color: 'violet' } }, 'hi class')
App = <h1 style={{ color: 'violet' }}>hi class</h1>

// JSX are not strings!

App = "<h1 style={{ color: 'violet' }}>hi class</h1>"

// Element with nested element.

App = React.createElement('h1', null, React.createElement('em', null, 'hello'))
App = <h1><em>hello</em></h1>

// Element with variable

let name = 'Alex'
App = React.createElement('h1', null, name)
App = <h1>{name}</h1>

// Element with array of children

let animals = ['cat', 'dog', 'monkey']

App = React.createElement(
  'ul',
  null,
  animals.map(animal => React.createElement('li', { key: animal }, animal))
)

App = <ul>{animals.map(animal => <li key={animal}>{animal}</li>)}</ul>

// PROTIP: Anything that can and will return an array will work!
// (map, filter, reduce, slice, etc...)

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

let GameResult = props =>
  <div>
    <h1>{props.win ? 'You win!' : 'You lose!'}</h1>
    <CustomButton primary={props.win}>Play again</CustomButton>
  </div>

App = <GameResult win={winCoinFlip} />

// Components should be designed for maximum reuse
// often this means passing along props even if you don't use them

// To illustrate this, consider the following situation:
// Let's pass an onClick handler to our CustomButton

App = (
  <CustomButton onClick={event => console.log(event)}>Click me!</CustomButton>
)

// Nothing happens when we click because the `onClick` prop isn't passed along
// Same thing would happen to other props like `disabled` or `className`

// Instead, let's pass the "rest" of the props to the button

let BetterCustomButton = ({ primary, style, ...props }) =>
  <button
    {...props}
    style={{
      backgroundColor: primary ? 'chartreuse' : 'tomato',
      ...style
    }}
  />

App = (
  <BetterCustomButton onClick={event => console.log(event)}>
    Click me!
  </BetterCustomButton>
)

// A higher order component (HOC)
// A function that takes a component and returns a component

let boldify

boldify = Component => props =>
  React.createElement(Component, {
    ...props,
    style: { fontWeight: 'bold', ...props.style }
  })

boldify = Component => props =>
  <Component {...props} style={{ fontWeight: 'bold', ...props.style }} />

let BoldCustomButton = boldify(BetterCustomButton)
let BoldDiv = boldify(props => <div {...props} />)

App = (
  <div>
    <CustomButton primary>Not bold button!</CustomButton>
    <BoldCustomButton primary>Bold button!</BoldCustomButton>
    <div>Not bold div!</div>
    <BoldDiv>Bold div!</BoldDiv>
  </div>
)

// Attach our React app to an existing DOM element

ReactDOM.render(App, document.getElementById('root'))
