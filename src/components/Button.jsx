import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <button className="text-gray-200 dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600 bg-slate-700 hover:bg-slate-600 px-12 py-2 rounded-full shadow-sm shadow-white dark:shadow-gray-500" onClick={this.props.onClick} >
                {this.props.label}
            </button>
        )
    }
}
