export class SubCateGory {
  constructor(
    public count: number,
    public id: number,
    public image_url: string,
    public level: number,
    public name: string
  ) {
    this.count = count
    this.id = id
    this.image_url = image_url
    this.level = level
    this.name = name
  }
}
export class Category {
  constructor(
    public count: number,
    public id: number,
    public ids: number[],
    public level: number,
    public name: string,
    public sub_categories: SubCateGory[]
  ) {
    this.count = count
    this.id = id
    this.ids = ids
    this.level = level
    this.name = name
    this.sub_categories = sub_categories
  }
}
export function createCategory(data: any): Category [] {
  return data.map((item: Category) => new Category(
    item.count, 
    item.id, 
    item.ids, 
    item.level, 
    item.name, 
    item.sub_categories
  ))

}
export function createSubCateGory(data: any): SubCateGory {
    return new SubCateGory(
      data.count,
      data.id,
      data.image_url,
      data.level,
      data.name
    )
}
