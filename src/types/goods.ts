export interface IAdd {
  goodsName: string;
  price: number;
}

export interface IModify {
  _id: string;
  goodsName: string;
  price: number;
}

export interface IGoodList {
  _id: string;
  goodsName: string;
  price: number;
  createAt?: string;
  updateAt?: string;
  __v?: number;
}

export interface IPage {
  page: number;
  pageSize: number;
}

export interface IDelete {
  _id: string;
}
