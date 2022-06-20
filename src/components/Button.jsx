import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <button className="text-black bg-slate-300 hover:bg-slate-400 px-12 py-2 rounded-full shadow-md shadow-gray-500" onClick={this.props.onClick} >
                {this.props.label}
            </button>
        )
    }
}
