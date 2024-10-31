import React from "react";

export default function SideBar(props) {
    const { handleToggleModal, data } = props
    return (
        <div className="sidebar">
            <div className="bgOverlay" onClick={handleToggleModal}></div>
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div>
                    <p className="descTitle">Description</p>
                    <p className="descContainer">{data?.explanation}
                    </p>
                </div>
                <button onClick={handleToggleModal}>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}
