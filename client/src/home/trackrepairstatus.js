import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AppTrackrepairstatus() {
  return (
    <section id="trackrepairstatus" className="block teams-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Track Repair Status</h2>
          <div className="subtitle">enter your repair ID to check the status of your repair</div>
        </div>
        <Form>
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Tracking No.
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Tracking No."
          />
          <Button type="submit" className="mb-2 align">
            Track
          </Button>
    </Form>
      </Container>
    </section>
  );
    }

export default AppTrackrepairstatus;