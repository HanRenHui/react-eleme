const AMap = (window as any).AMap


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

