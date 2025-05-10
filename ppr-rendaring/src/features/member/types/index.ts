// export class Member {
//   id: string;
//   name: string;

//   constructor(id: string, name: string) {
//     this.id = id;
//     this.name = name;
//   }

//   // メソッドも定義できる（例: 初期データ返す）
//   static init(): Member {
//     return new Member("", "");
//   }
// }

export type Member = {
  id: string;
  name: string;
};
