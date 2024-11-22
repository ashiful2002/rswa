import React, { useState } from "react";
import { CardGroup, Button, Card, Collapse } from "react-bootstrap";
import { FaArrowAltCircleDown , FaArrowAltCircleUp} from "react-icons/fa";

import { cardtext } from "../constants";

function BsCard() {
  const [open, setOpen] = useState(false);

  const handleBlogClick = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      {  cardtext && cardtext.map((item) => (
        <div className="" key={item.id}>
          <CardGroup>
            <Card className="">
              <Card.Body>
                <Card.Title className="capitalize">{item.title}</Card.Title>
                <Card.Text>
                  <p>{item.desc}</p>
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={handleBlogClick}
                  aria-controls={item.id}
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-2">
                    {" "}
                    {item.btnText}{" "}
                    {open ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
                  </span>
                </Button>
                <Collapse in={open}>
                  <div id={item.id}>{item.fullDesc}</div>
                </Collapse>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      ))}
    </div>
  );
}

export default BsCard;
