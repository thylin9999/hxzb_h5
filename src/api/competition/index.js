import request from '../request'
import url from './url'
export function getLiveList () {
    return request({
        method: 'get',
        url: url.getLiveList
    })
}
