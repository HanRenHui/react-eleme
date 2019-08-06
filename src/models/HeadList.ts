export class HeadItem {
  constructor(public id: number, public name: string, public restaurant_category_ids: number []) {
    this.id = id 
    this.name = name 
    this.restaurant_category_ids = restaurant_category_ids

  }
}

export function createHeadList(data: any): HeadItem []{
  return data.map((item: HeadItem) => new HeadItem(item.id, item.name, item.restaurant_category_ids) )
}