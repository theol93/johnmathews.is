import { JupyterNotebookViewer } from "react-jupyter-notebook-viewer"

function Notebook(props) {
  console.log("--- !*!*!*! debug props: ", props)
  const notebook = new JupyterNotebookViewer(props)
  return <>{notebook}</>
}

export default Notebook
