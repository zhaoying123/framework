import * as actionTypes from '../constants/comment'

export function update(data) {
    return {
        type: actionTypes.COMMENT_ADD,
        data
    }
}

