import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="my-3 align-center">
            <h1>ページが見つかりませんでした。</h1>
            <button className="mt-2 btn border rounded">
                <Link to={"/home/timeline"}>→タイムラインへ戻る</Link>
            </button>
        </div>
    );
};
