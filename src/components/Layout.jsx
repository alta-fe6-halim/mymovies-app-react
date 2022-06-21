import CustomHeader from "./Header";
import React from "react";

const Layout = (props) => {
    return (
        <div className="w-full h-screen flex flex-col overflow-auto bg-slate-50 dark:bg-black" >
            <CustomHeader title={props.title} onKeyDown={props.onKeyDown} />
            <div className="h-full w-full">{props.children}</div>
        </div>
    );
}

export default Layout;
