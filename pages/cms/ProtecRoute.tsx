import React from "react";
import { parseCookies } from "@/utils/token";
import { wrapper } from "@/wapper/store";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    let user = await parseCookies(req);
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/cms/signin",
        },
      };
    }
    return {
      props: { user, data: { props: { user } } },
    };
  }
);

const ProtecRoute = (WrappedComponent) => {
  return () => {
    return <WrappedComponent />;
  };
};

export default ProtecRoute;
