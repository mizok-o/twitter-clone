import React from "react";

export const TweetStatus = (props) => {
    const { replies, favs } = props;

    return (
        <div className="d-flex py-2">
            <div className="d-flex me-2">
                <div>返信</div>
                <div>
                    <span>{replies.length}</span>
                </div>
            </div>
            <div className="d-flex me-2">
                <div>いいね</div>
                <div>
                    <span>{favs.length}</span>
                </div>
            </div>
            <div className="d-flex me-2">
                <div>リツイート</div>
                <div>
                    <span>0{/* {retweetsNum} */}</span>
                </div>
            </div>
        </div>
    );
};
