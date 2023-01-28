import Carousel from 'react-bootstrap/Carousel';

var heroData = [
  {
    id: 1,
    image: require('../assets/images/itsolutions.jpeg'),
    title: 'The perfect IT Solutions',
    description: 'Safety. Ratio. Ratio. Process. The day-to-day job challenges companies face are uniform across the board, yet they differ deeply and quality from the organization.',
    link: 'https://www.google.com'
  },
  {
    id: 2,
    image: require('../assets/images/consulting.jpg'),
    title: 'The best Consultancy',
    description: 'Our knowledge technology consulting firm delivers custom-tailored IT consultancy services encompassing a variety of enterprise field schemes.',
    link: 'https://www.facebook.com'
  },
  {
    id: 3,
    image: require('../assets/images/security.jpg'),
    title: 'Expert on Security',
    description: 'As this cyberthreat picture continues to develop and emerging threats, we are always equipped with latest techs that needed to prevent this.',
    link: 'https://www.twitter.com'
  }
]

function AppHero() {
  return (
    <section id="home" className="hero-block">
       <Carousel>
          {
            heroData.map(hero => {
              return (
                <Carousel.Item key={hero.id}>
                  <img
                    className="d-block w-100"
                    src={hero.image}
                    alt={"slide " + hero.id}
                  />
                  <Carousel.Caption>
                    <h2>{hero.title}</h2>
                    <p>{hero.description}</p>
                    <a className="btn btn-primary" href={hero.link}>Learn More <i className="fas fa-chevron-right"></i></a>
                  </Carousel.Caption>             
                </Carousel.Item>
              );
            })
          }
      </Carousel>
    </section>
  );
}

export default AppHero;