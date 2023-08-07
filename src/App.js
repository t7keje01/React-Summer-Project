import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './components/layout.css'

function App() {
  return (
    <>
    <Header/>
    <div className='content-container'>
      <Main/>
    </div>
    <Footer/>
    </>
  );
}

export default App;
