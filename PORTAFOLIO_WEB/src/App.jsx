import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import InstallPWA from './components/InstallPWA'

// Página única con scroll y anclas: cada componente es una sección
// independiente que solo consume datos de src/data/portfolioData.js.
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <InstallPWA />
    </>
  )
}

export default App
