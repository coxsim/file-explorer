import './App.css'
import {FileExplorer} from "./FileExplorer.tsx";

function App() {
  return (
    <>
      <FileExplorer files={[
        {name: 'README.md', directory: false},
        {name: 'src', directory: true, children: [
            {name: 'App.tsx', directory: false},
            {name: 'main.tsx', directory: false}
          ]},
      ]}/>
    </>
  )
}

export default App
