import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './components/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div id='appContainer'>
        <Header/>
        <div id='contentContainer' data-testid='contentContainer'>
          <Main/>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
