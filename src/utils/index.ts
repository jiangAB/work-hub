/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 公共函数

/**
 * 数组是否相同
 * @param dataOne 
 * @param dataTwo 
 * @returns 
 */
export function isEqual(dataOne: unknown, dataTwo: unknown) {
  try {
    if( JSON.stringify(dataOne) === JSON.stringify(dataTwo) ) return true;
    else return false;
  } catch {
    if( dataOne === dataTwo ) return true
    else return false;
  }
}
// 清除 对象 中为空的属性

/**
 * 清除object中为空的属性
 * @param {Object} obj 要清除空属性的对象
 * @returns {Object} 清除了空属性后的新对象
*/
export function removeEmptyValues(obj:object): object{
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
  );
}