import React, { useState } from "react";
import { CardGroup, Button, Card, Collapse, Accordion } from "react-bootstrap";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import { cardtext } from "../constants";
import facebook from "../assets/icon/facebook.svg";
import Share from "./Social/Share";
function BsCard() {
  const [open, setOpen] = useState(false);

  const handleBlogClick = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      {cardtext &&
        cardtext.map((item) => (
          <div className="mb-4" key={item.id}>
            {
              <Accordion>
                <Accordion.Item eventKey={item.id}>
                  <Accordion.Header>{item.title}</Accordion.Header>
                  {
                    <img
                      src={item.img && item.img}
                      alt={item.title}
                      className="rounded"
                    />
                  }
                  <Accordion.Body>
                    <p> {item.desc}</p>
                    <p> {item.fullDesc}</p>
                    <Share className="text-sm" />
                  </Accordion.Body>

                  <div className="flex flex-col items-center justify-between md:flex-row">
                    <Share className="text-sm" />
                    <span className="px-2 text-sm">
                      {<p className="text-neutral-500">Last updated: {item.showDate}</p>}
                    </span>
                  </div>
                </Accordion.Item>
              </Accordion>
            }

            {/* <CardGroup>
              <Card className="">
                <Card.Body>
                  <Card.Title className="capitalize">{item.title}</Card.Title>

                  <img src={item.img && item.img} alt="" className="rounded" />

                  <Card.Text>
                    <p>{item.desc}</p>
                  </Card.Text>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="primary"
                      onClick={handleBlogClick}
                      aria-controls={item.id}
                      aria-expanded={open}
                    >
                      <span className="flex items-center gap-2">
                        {" "}
                        {item.btnText}{" "}
                        {open ? (
                          <FaArrowAltCircleUp />
                        ) : (
                          <FaArrowAltCircleDown />
                        )}
                      </span>
                    </Button>
                    {item.showDate && (
                      <span className="rounded border px-2 capitalize">
                        Last Edit: <button>{item.showDate}</button>{" "}
                      </span>
                    )}
                  </div>
                  <Collapse in={open}>
                    <div id={item.id}>{item.fullDesc}</div>
                  </Collapse>
                </Card.Body>
              </Card>
            </CardGroup> */}
          </div>
        ))}
    </div>
  );
}

export default BsCard;
