import ToolBar from './components/ToolBar';
import InvoiceListing from './components/InvoiceListing';
import './App.css'

// const theme = createTheme();

function App() {

  return (
    <div className='app'>
      <ToolBar />
      <InvoiceListing />
    </div>
  )
}

export default App
