import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import img1 from '../images/sagkaray.jpg';

function AppAbout() {

  return (
    <section id="about" className="block about-block">
      <Container fluid>
        <div className="title-holder">
          <h2>About Us</h2>
          <div className="subtitle">learn more about us</div>
        </div>
        <Row>
          <Col sm={6}>
            <Image src={img1} />
          </Col>
          <Col sm={6}>
            <p>In 2013, it was established with a single location in Giporlos, Eastern Samar; a month later, we began building a new branch in Guiuan, Eastern Samar. The second location was supposed to open in Guiuan on November 8, 2013, but it was postponed after the city was devastated by Typhoon Yolanda. There is nothing left in good condition about our property. We tried to get back on our feet the year after the lights came back on, and we were successful until the pandemic hit in 2019. As a result, we had to shut down a number of branches; however, we were able to weather the storm by fully diversifying our business into unrelated industries, such as solar energy and fiber optics. Despite everything, we have managed to keep our business running, and we are making strides toward making up for lost revenue.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AppAbout;