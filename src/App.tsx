import { useRoutes } from "react-router-dom";
import { ConfigProvider } from "antd";

import router from "./router";

function App() {
  const outlet = useRoutes(router);
  return (
    <ConfigProvider>
      <div>
        {outlet}
      </div>
    </ConfigProvider>
  )
}

export default App
