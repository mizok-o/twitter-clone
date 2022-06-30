import React from "react";

import "/css/pagenation.css";

export const Pagenation = (props) => {
    const { currentPage, setCurrentPage } = props;
    // ページネーションの総数
    const totalPage = Math.ceil(props.sum / props.per);

    // ボタンで１ページ戻る時
    const handleBack = () => {
        if (currentPage === 1) {
            return;
        }
        setCurrentPage(currentPage - 1);
    };

    // ボタンで１ページ進む時
    const handleForward = () => {
        if (currentPage === totalPage) {
            return;
        }
        setCurrentPage(currentPage + 1);
    };

    // ページ番号を直接クリックされたときの処理
    const handleMove = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="mt-4">
            {totalPage !== 0 && (
                <nav className="Page navigation example">
                    <ul className="pagination">
                        <li>
                            <button
                                className={`page-item pagenation__arrow py-2 ${
                                    currentPage === 0 || currentPage === 1
                                        ? "pagenation__arrow--disabled"
                                        : ""
                                }`}
                                onClick={handleBack}
                            >
                                ＜
                            </button>
                        </li>
                        {[...Array(totalPage).keys()].map((page) => {
                            page++;
                            return (
                                <li key={page}>
                                    <button
                                        className={`page-item pagenation__item py-2 ${
                                            page === currentPage ||
                                            (currentPage === 0 && page === 1)
                                                ? "pagenation__item--active"
                                                : ""
                                        }`}
                                        onClick={() => handleMove(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                        <li>
                            <button
                                className={`page-item pagenation__arrow py-2
                                ${
                                    currentPage === totalPage
                                        ? "pagenation__arrow--disabled"
                                        : ""
                                }
                                `}
                                onClick={handleForward}
                            >
                                ＞
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};
