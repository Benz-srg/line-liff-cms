import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    faseInsection: {
      opacity: 0,
      transform: "translateX(-20vh)",
      visibility: "hidden",
      transition: "opacity 0.6s ease-out, transform 1.2s ease-out",
      willChange: "opacity, visibility",
    },
    isVisible: {
      opacity: 1,
      transform: "none",
      visibility: "visible",
    },
  })
);

const Fadeinsection = (props) => {
  const classes = useStyles();
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`${classes.faseInsection} ${
        isVisible ? classes.isVisible : ""
      }`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

export default Fadeinsection;
