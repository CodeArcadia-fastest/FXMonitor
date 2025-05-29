
import Navbar from './components/Navbar';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';
import Donate from './pages/Donat';
import Article from './components/Article';
import './App.css';

export default function App() {
  
  return (
   <>
   <Navbar></Navbar>
   <Header></Header>
   <Section></Section>
   <Article></Article>
   <Donate></Donate>
   <Footer></Footer>
   </>
  );
}