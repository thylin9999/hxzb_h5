import request from '../request'
import url from './url'
export function getLiveList () {
    return request({
        method: 'get',
        url: url.getLiveList
    })
}
export function getBattles ({ date }) {
    return request({
        method: 'get',
        url: url.getBattles,
        params: {
            date
        }
    })
}

export function getBookedMatches ({ pageNumber = 1, pageSize = 20 }) {
    return request({
        method: 'post',
        url: url.getBookedMatches,
        data: {
            pageNum: pageNumber,
            pageSize
        }
    })
}
