import React from 'react'
import ReactDOM from 'react-dom'
import Main from './views/index.jsx'

let data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'))
ReactDOM.render(<Main data={data}/>, document.getElementById('app'))