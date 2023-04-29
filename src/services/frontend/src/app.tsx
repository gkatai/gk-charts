import { useEffect } from "preact/hooks";
import { gkChartsAxios } from "./helpers/gk-charts-axios";

export function App() {
  useEffect(() => {
    gkChartsAxios.get("test").then((response) => console.log(response.data));
  }, []);

  return <div>Hello gk-charts...</div>;
}
