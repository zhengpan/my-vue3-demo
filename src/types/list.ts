export interface IList {
  page: number;
  pageSize: number;
}

export interface IResult {
  _id: string;
  username: string;
  age?: any;
  email: string;
  phone: string;
  avatar?: any;
  createAt: string;
  updateAt: string;
  __v: number;
}
