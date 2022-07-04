import request from '../request'
import url from './url'

export function getOnlineBroadcast ({ pageNumber = 1, pageSize = 2000, type = null }) {
    return request({
        method: 'post',
        url: url.getOnlineBroadcast,
        data: {
            pageNum: pageNumber,
            pageSize,
            type
        }
    })
}
