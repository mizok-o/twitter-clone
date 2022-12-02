import React from "react";

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center w-100 looping-spinner-container">
            <div className="looping-rhombuses-spinner">
                <div className="rhombus"></div>
                <div className="rhombus"></div>
                <div className="rhombus"></div>
            </div>
        </div>
    );
};
