import cookie from "js-cookie";
import dayjs from "dayjs";

export const saveUser = async (token) => {
  await cookie.set("user", token, {
    expires: token.expiresIn,
  });
};

export const removeToken = async () => {
  await cookie.remove("user");
};

export function parseCookies(req) {
  return req.cookies.user || "";
}

export function parseCookiesCustomer(req) {
  return req.cookies.customer || "";
}

export const saveCookieCustomer = async (token) => {
  const customer = {
    id: token._id,
    liffId: token.liffId,
    fullName: token.fullName,
  };
  await cookie.set("customer", customer);
};

export const removeCustomer = async () => {
  await cookie.remove("customer");
};
