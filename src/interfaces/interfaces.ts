export type Jewelry =
{
    _id: string,
    name: string,
    material: string,
    description: string,
    imageURL: string,
    price: number,
    stock: number,
    collection: string,
    isOnDiscount: boolean,
    discount: number,
    isFeatured: boolean,
    _createdBy: string
  }


export type newJewelry = Omit<Jewelry, '_id'> /* & {
    _createdBy?: string
} */

/* export type newJewelry = {
    name: string,
    material: string,
    description: string,
    imageURL: string,
    price: number,
    stock: number,
    collection: string,
    isOnDiscount: boolean,
    discount: number,
    isFeatured: boolean,
    _createdBy: string
  } */


export type User = {
        id: string,
        name: string,
        email: string,
        password: string,
        registeredAt: string
}

export type CartItem = {
  _id: string,
  name: string,
  price: number,
  quantity: number,
  imageURL: string
}

export type OrderItems = {
  _id: string,
  orderDate: string,
  total: number,
  userName: string,
  orderStatus: string,
  orderNumber: string,
  orderLine: Array<{jewelry: Jewelry, quantity: number}>
}