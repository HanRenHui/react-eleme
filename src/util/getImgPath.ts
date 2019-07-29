// 将数据中的image_path 转换成真正的图片地址
export const getImgPath = (img_path: string, flag: number) => {
  let firstPart: string = img_path.slice(0, 1)
  let secPart: string = img_path.slice(1, 3)
  let thrPart: string = img_path.slice(3)
  let postFix: string
  if (img_path.length === 36) {
    postFix = img_path.slice(-4)
  } else {
    postFix = img_path.slice(-3)
  }
  switch (flag) {
    case 0:
      return `https://fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
    case 1:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/48x/`
    case 2:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/176x/`
    case 3:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/750x/`
    case 4:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/150x/`
    case 5:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/686x/`
    case 6:
      return `https://cube.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?x-oss-process=image/resize,m_lfit,w_361/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp`
    case 7:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/26x/`
    case 8:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/!99.45600585937501x99.45600585937501r/gravity/Center/crop/99.45600585937501x99.45600585937501/`
    case 9:
      return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/300x/`
    case 10: 
      return `https://fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/!72x72r/gravity/Center/crop/72x72/`
    case 11:
      return `https://fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/!64x64r/gravity/Center/crop/64x64/`
  }

}



// 配送距离format
export const formatDistance = (dis: number, restList: any) => {
  let distance
  if (dis > 1000) {
    distance = restList.get('distance') / 1000
    distance = distance.toFixed(2) + 'k'
  } else {
    distance = restList.get('distance')
  }
  return distance

}