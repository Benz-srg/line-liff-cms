import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRouter } from "next/router";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Button onClick={() => router.back()}>
        <ArrowBackIcon /> กลับ
      </Button>
    </React.Fragment>
  );
};

export default ButtonBack;