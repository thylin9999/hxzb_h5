import Mock, { Random } from 'mockjs'
import { statusCode } from '../../utils/statusCode'
import url from '../../api/competition/url'
const getLiveList = config => {
    console.log(Random)
    return Mock.mock({
        code: statusCode.success,
        'data|5-20': [{
            team1: {
                name: '@cname',
                id: '@id'
            },
            team2: {
                name: '@cname',
                id: '@id'
            },
            'img|1': [
                'https://cdn.podapi.com/image/live/20220511/810101297e7bf7d0418f718121cf2e2b?imageView2/2/w/600/h/600',
                'https://cdn.podapi.com/image/live/20220511/74fe6e768e027c7e8152fdc9156fb6d8?imageView2/2/w/600/h/600',
                'https://cdn.sportnanoapi.com/football/team/0ca927f81a711c8df6961aa864fb1898.jfif',
                'https://cdn.sportnanoapi.com/football/team/9e033dde06190d44817b6e37a4bc0b2b.png'
            ],
            user: {
                name: '@cname',
                viewers: {
                    'count|0-2000000': 2000
                }
            }
        }]
    })
}

Mock.mock(url.getLiveList, 'get', getLiveList)
