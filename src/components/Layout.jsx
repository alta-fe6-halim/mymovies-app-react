import React, { Component } from "react";
import CustomHeader from "./Header";

class Layout extends Component {
    render() {
        return (
            <div className="w-full h-screen flex flex-col overflow-auto bg-slate-50">
                <CustomHeader title={this.props.title} onKeyDown={this.props.onKeyDown} />
                <div className="h-full w-full">{this.props.children}</div>
            </div>
        );
    }
}

export default Layout;
