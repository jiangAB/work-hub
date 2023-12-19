// 公共函数

// 数组是否相同
export function isEqual(dataOne: unknown, dataTwo: unknown) {
  try {
    if( JSON.stringify(dataOne) === JSON.stringify(dataTwo) ) return true;
    else return false;
  } catch {
    if( dataOne === dataTwo ) return true
    else return false;
  }
}