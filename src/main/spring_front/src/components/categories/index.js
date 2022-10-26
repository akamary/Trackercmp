import { Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { MessageText, CategoriesContainer } from "./../../styles/categories";
import { Colors } from "./../../styles/theme";

const messages = [
  "Explore our Products",
  "Categories: ",
  "Please like and subscribe !",
];
export default function Categories() {
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % messages.length);

      // slide the message in
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <CategoriesContainer ref={containerRef} overflow="hidden">
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        container={containerRef.current}
        timeout={{
          enter: 500,
          exit: 100,
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <MessageText>{messages[messageIndex]}</MessageText>
        </Box>
      </Slide>
    </CategoriesContainer>
  );
}
