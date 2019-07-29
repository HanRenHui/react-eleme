export default function dateFormat(time: number) {
  let date = new Date(time)
  let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes() 
  let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${h}:${m}:${s}`
}