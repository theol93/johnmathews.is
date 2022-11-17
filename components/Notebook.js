import { JupyterNotebookViewer } from "react-jupyter-notebook-viewer"

export default function Notebook(props) {
  const notebook = new JupyterNotebookViewer(props)
  return (
    <div id="notebookWrapper" className="-mr-10 bg-slate-300 dark:text-gray-800">
      {notebook}
    </div>
  )
}
