import store from '../store'
import * as actions from '../store/actions/homeAction'
const AMap = (window as any).AMap

/**
 * 精准定位
 */
export function getLocation() {
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 5000,
    })

    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)
    AMap.event.addListener(geolocation, 'error', onError)

    function onComplete(data: any) {
      // 精准定位
      // store.dispatch({})
      store.dispatch(actions.set_address(data.formattedAddress))
      store.dispatch(actions.set_location(data))
      store.dispatch(actions.hide_loading())
    }

    function onError(data: any) {
      // 定位出错 采用 IP定位获取当前城市信息
      getLnglatLocattion()
    }
  })
}


/**
 * 根据ip来定位
 */

function getLnglatLocattion() {
  AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status: string, result: any) {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        AMap.plugin('AMap.Geocoder', function () {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: result.adcode
          })
          // var lnglat = [116.396574, 39.992706]
          const lnglat = result.rectangle.split(';')[0].split(',')
          console.log(lnglat)
          geocoder.getAddress(lnglat, function (status: string, result: any) {
            if (status === 'complete' && result.info === 'OK') {
              // result为对应的地理位置详细信息
              store.dispatch(actions.set_location({
                addressComponent: {
                  city: result.regeocode.addressComponent.city,
                  province: result.regeocode.addressComponent.province
                },
                formattedAddress: result.regeocode.formattedAddress
              }))
              store.dispatch(actions.set_address({
                formattedAddress: result.regeocode.formattedAddress
              }))
              store.dispatch(actions.hide_loading())

            }
          })
        })
      }
    })
  })
}


// 获取搜索提示

/**
 * 
 * @param city 限定城市 
 * @param keyword 要搜索的关键字
 * @param fn 搜索成功的回调
 */


export const getSearchTips = (city: string, keyword: string, fn: any) => {
  AMap.plugin('AMap.Autocomplete', function () {
    // 实例化Autocomplete
    var autoOptions = {
      //city 限定城市，默认全国
      city
    }
    var autoComplete = new AMap.Autocomplete(autoOptions);
    if (keyword) {
      autoComplete.search(keyword, fn)
    } else {
      fn(200, { tips: [] })
    }

  })
}

