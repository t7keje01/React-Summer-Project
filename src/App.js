import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './components/layout.css';

function App() {
  return (
    <div id='app-container'>
        <Header/>
        <div id='content-container' data-testid='content-container'>
          <Main/>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
