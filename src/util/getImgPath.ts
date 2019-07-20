// 将数据中的image_path 转换成真正的图片地址
export  const getImgPath =  (img_path: string, flag: number) => {
  let firstPart: string = img_path.slice(0, 1)
  let secPart: string = img_path.slice(1, 3)
  let thrPart: string = img_path.slice(3)
  let postFix: string
  if (img_path.length === 36) {
    postFix = img_path.slice(-4)
  } else {
    postFix = img_path.slice(-3)
  }
  if (flag === 0) {
    return `https://fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
  } else if (flag === 1) {
    return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/48x/`
  } else if (flag === 2) {
    return `//fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?imageMogr/format/webp/thumbnail/176x/`
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