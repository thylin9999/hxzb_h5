import request from '../request'
import url from './url'
export function getLiveList ({ pageNumber = 1, pageSize = 2000, type = 0 }) {
    return request({
        method: 'post',
        url: url.getLiveList,
        data: {
            'pageNum': pageNumber,
            'pageSize': pageSize,
            type
        }
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

export function getHotMatches ({ day = null }) {
    return request({
        method: 'post',
        url: url.getHotMatches,
        data: {
            day: day || null
        }
    })
}

// 卡片预约赛事
export function addSubscribeMatch (matchId) {
    return request({
        method: 'post',
        url: url.addSubscribeMatch,
        data: {
            match_id: matchId
        }
    })
}
// 赛程
export function getMatchList ({
    pageNumber = 1,
    pageSize = 2000,
    leagueId = null,
    playing = '',
    leagueType = null,
    day = null
}) {
    return request({
        method: 'post',
        url: url.getMatchList,
        timeout: 1000 * 60, // 1分钟
        data: {
            'pageNum': pageNumber,
            pageSize,
            day,
            leagueId,
            playing,
            leagueType
        }
    })
}
