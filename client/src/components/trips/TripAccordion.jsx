import { Accordion, Card, Row, Col, Button } from "react-bootstrap";

export default function TripAccordion({ trips, onEdit, onDelete }) {
  if (!trips || trips.length === 0) {
    return (
      <p className="text-muted">
        No trips added yet. Go and add your first trip!
      </p>
    );
  }

  return (
    <Accordion alwaysOpen>
      {trips.map((trip, index) => (
        <Accordion.Item eventKey={trip._id} key={trip._id || index}>
          <Accordion.Header>
            <Row className="w-100">
              <Col className="align-items-center">
                <h4>
                  <strong>{trip.title}</strong>
                </h4>
              </Col>
              <Col className="align-items-center text-center">
                {trip.startDate} - {trip.endDate}
              </Col>

              <Col className="text-center">
                {trip.legs && trip.legs.length > 0
                  ? `${trip.legs.length} Leg${trip.legs.length > 1 ? "s" : ""}`
                  : "No Legs"}
              </Col>
              <Col className="text-center">
                {trip.expenses
                  ? `$${Object.values(trip.expenses)
                      .reduce((sum, val) => sum + val, 0)
                      .toFixed(2)}`
                  : "$0.00"}
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body className="accordion-body">
            <h5 className="mb-3">Description</h5>
            <p>{trip.description}</p>

            {/* Legs of the trip */}
            {trip.legs && trip.legs.length > 0 && (
              <>
                <h5 className="mb-3">Legs</h5>
                <Row xs={1} md={4} lg={5} className="g-4">
                  {trip.legs.map((leg, legIndex) => (
                    <Col key={leg._id || legIndex}>
                      <Card className="accordion-inner-cards">
                        <Card.Body className="text-left">
                          <Card.Title>
                            <strong>
                              {leg.city}, {leg.state}
                            </strong>
                          </Card.Title>
                          <Card.Text>Days: {leg.days}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            )}

            {/* Expenses */}
            {trip.expenses && (
              <>
                <h5 className=" mb-3">Expenses</h5>
                <Row xs={1} md={2} lg={5} className="g-3">
                  {Object.entries(trip.expenses).map(([key, value]) => (
                    <Col key={key}>
                      <Card className="accordion-inner-cards">
                        <Card.Body>
                          <Card.Title className="text-capitalize">
                            <strong>{key}</strong>
                          </Card.Title>
                          <Card.Text>
                            ${Number(value).toFixed(2)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                  <Col>
                    <Card className="accordion-inner-cards">
                      <Card.Body className="accordion-total-expense-card">
                        <Card.Title><strong>Total Expense</strong></Card.Title>
                        <Card.Text>
                          <strong>
                            $
                            {Number(
                              Object.values(trip.expenses).reduce(
                                (sum, val) => sum + val,
                                0
                              )
                            ).toFixed(2)}
                          </strong>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            )}

            {/* Notes */}
            {trip.notes && (
              <>
                <h5 className="mt-4">Notes</h5>
                <p>{trip.notes}</p>
              </>
            )}

            {/* Edit and Delete Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onEdit(trip)}
              >
                Edit
              </Button>
              <Button 
                className="btn-delete"
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(trip)}
              >
                Delete
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
