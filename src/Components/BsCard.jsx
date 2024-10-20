import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { CardGroup } from "react-bootstrap";

import { cardtext } from "../constants";


function BsCard() {
  return (
    <div className="container">
      {cardtext.map((item) => (
        <CardGroup>
          <Card className="" key={item.id}>
            <Card.Body>
              <Card.Title className="capitalize">{item.title}</Card.Title>
              <Card.Text>{item.desc}</Card.Text>
              <Button variant="primary">
                <Link className="text-white " to={item.title}>
                  {item.btnText}
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </CardGroup>
      ))}
    </div>
  );
}

export default BsCard;
