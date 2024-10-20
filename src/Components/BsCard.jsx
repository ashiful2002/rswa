import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { CardGroup } from "react-bootstrap";

import { cardtext } from "../constants";

function BsCard() {
  return (
    <div className="container">
      {cardtext.map((item) => (
        <div className="">
          <CardGroup>
            <Card className="" key={item.id}>
              <Card.Body>
                <Card.Title className="capitalize">{item.title}</Card.Title>
                <Card.Text>
                  <p>{item.desc}</p>
                </Card.Text>
                <Button variant="primary">
                  <Link className="text-white " to={item.title}>
                    {item.btnText}
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      ))}
    </div>
  );
}

export default BsCard;
