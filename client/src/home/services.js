import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const servicesData = [
  {
    id: 1,
    icon: 'fas fa-network-wired',
    title: 'Fiber to Home',
    description: 'Fiber to the home (FTTH), also called fiber to the premises (FTTP), is the installation and use of optical fiber from a central point directly to individual buildings such as residences, apartment buildings and businesses to provide high-speed internet access.'
  },
  {
    id: 2,
    icon: 'fas fa-tower-cell',
    title: 'Tower Construction',
    description: 'As your General Contractor, we will provide a comprehensive Estimate based on your completed construction drawings. We will develop an accurate construction schedule and work to deliver a quality project meeting both schedule and budget.'
  },
  {
    id: 3,
    icon: 'fas fa-diagram-project',
    title: 'Network Design',
    description: 'Network planning and design is an iterative process, encompassing topological design, network-synthesis, and network-realization, and is aimed at ensuring that a new telecommunications network or service meets the needs of the subscriber and operator.'
  },
  {
    id: 4,
    icon: 'fas fa-desktop',
    title: 'Computer and Printers Repair',
    description: 'We repair any kind of computers and printers, with a convenient tracking system for the status, you will never waste a mile for nothing, just enter the tracking number fot your repair order and the status will be instantly viewed.'
  },
  {
    id: 5,
    icon: 'fas fa-shield',
    title: 'Network Security',
    description: 'Network security consists of the policies, processes and practices adopted to prevent, detect and monitor unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.'
  },
  {
    id: 6,
    icon: 'fas fa-handshake',
    title: 'Consultancy in Relevant Field',
    description: 'Consider hiring business consultants when you need help or perspective on your chosen path, or a catalyst for change in your companies or business. With our expertise, we will guide you to a success and prosperity.'
  }
]

function AppServices() {
  return (
    <section id="services" className="block services-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Our services</h2>
          <div className="subtitle">services we provide</div>
        </div>
        <Row>
          {
            servicesData.map(services => {
              return (
                <Col sm={4} className='holder' key={services.id}>
                  <div className="icon">
                    <i className={services.icon}></i>
                  </div>
                  <h3>{services.title}</h3>
                  <p>{services.description}</p>
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </section>
  );
}

export default AppServices;