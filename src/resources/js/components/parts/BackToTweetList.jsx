import React from "react";
import { Link } from "react-router-dom";

export const PageBackButton = () => {
    return (
        <div className="d-flex align-items-center mb-3">
            <Link to="/home/timeline">
                <button className="btn">
                    <svg
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#111111"
                        className="bi bi-arrow-left"
                    >
                        <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </button>
            </Link>
            <div className="ms-2">
                <h2>タイムラインへ</h2>
            </div>
        </div>
    );
};
