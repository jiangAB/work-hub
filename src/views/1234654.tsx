import { useState } from "react";

import { testGet } from "@/api/server"
import { isEqual } from "@/utils/index"
// test返回数据类型
interface Data {
  id: number,
  name: string
}
function App() {
const [ data, setData ] = useState<Data[] | null >(null); 
const handleTest = () => {
  testGet().then((res) => {
    if ( !isEqual(res.data, data) ) {
      setData(res.data);
      console.log('object');
    }
  })

  /* testPost().then((res) => {
    console.log(res);
  }) */
}
  return (
    <>
      <button onClick={handleTest} >ABC</button>
      {
        data?.map((item,index) => {
          return <li key={index}>{item.name}</li>
        })
      }
    </>
  )
}

export default App
