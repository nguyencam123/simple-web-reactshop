import React from "react";
import { useLocation } from "react-router-dom";
import HeaderAdmin from "./headeradmin";
import "./adminheaderandfooterwrapper.css"

const AdminHeaderAndFooterWrapper = ({ children }) => {
    return (
        <div>
            <div className="flex-container">
                <div className="left-column">
                    <HeaderAdmin />
                </div>
                <div className="right-column">{children}
                </div>
            </div>
        </div>
    );
};

export default AdminHeaderAndFooterWrapper;