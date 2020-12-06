/**
 * @fileoverview application/exec_stmt/query/exec_stmt_tag.js
 */

/* ================================================== [INSERT] ================================================== */

const insert1 = `
    INSERT INTO
        EXEC_STMT_TAG (
            EXEC_STMT_IDX, TAG_IDX
        )
    VALUES
        ?
`;

/* ================================================== [SELECT] ================================================== */

/* ================================================== [UPDATE] ================================================== */

/* ================================================== [DELETE] ================================================== */

const delete1 = `
    DELETE FROM
        EXEC_STMT_TAG
    WHERE
        EXEC_STMT_IDX = :execStmtIdx
`;

module.exports = {
    insert1,
    delete1
};
