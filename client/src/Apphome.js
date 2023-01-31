import 'bootstrap/dist/css/bootstrap.min.css';
import "./home/App.css";

import AppHeader from './home/header';
import AppHero from './home/hero';
import AppAbout from './home/about';
import AppServices from './home/services';
import AppTrackrepairstatus from './home/trackrepairstatus';
import AppTestimonials from './home/testimonials';
import AppContact from './home/contact';
import AppFooter from './home/footer';


// import { AppHeader, AppHero, AppAbout, AppServices, AppTrackrepairstatus, AppTestimonials, AppContact, AppFooter} from './home';

function AppHome () {
    return (
      <div className="App">
        <header id='header'>
          <AppHeader />
        </header>
        <main>
          <AppHero />
          <AppAbout />
          <AppServices />
          <AppTrackrepairstatus />
          <AppTestimonials />
          <AppContact />
        </main>
        <footer id="footer">
          <AppFooter />
        </footer>
      </div>
    );
  }
  
  export default AppHome;