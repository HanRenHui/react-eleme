export class NavTab {
  constructor(public icon: string, public name: string, public _id: string) {
    this.icon = icon 
    this.name = name 
    this._id = _id 
  }
}

export const createNavTab = (data: any): NavTab [] => {
  return data.map((item: NavTab) => new NavTab(
    item.icon,
    item.name, 
    item._id
  ))
}
