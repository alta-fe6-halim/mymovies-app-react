import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <button className="text-white bg-slate-700 hover:bg-slate-600 px-12 py-2 rounded-full shadow-sm shadow-white" onClick={this.props.onClick} >
                {this.props.label}
            </button>
        )
    }
}
