import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Detail {
  name: string;
  icon: JSX.Element;
  path: string;
  total: number;
}

interface Props {
  detail: Detail;
}

export default function SimpleCard({ detail }: Props) {
  const classes = useStyles();
  const { icon, name, path, total } = detail;
  return (
    <Card className={classes.root}>
      <CardContent>
        {icon}
        <Typography variant="h5" component="h2">
          {total}
        </Typography>
        <Typography
          gutterBottom
          className={classes.title}
          variant="h5"
          component="h2"
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
