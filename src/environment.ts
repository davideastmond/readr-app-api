require("dotenv").config();

function isProduction() {
  if (process.env.NODE_ENV && process.env.NODE_ENV.match("development"))
    return false;
  if (process.env.NODE_ENV && process.env.NODE_ENV.match("test")) return false;
  return true;
}
export const ENV_PAGE_SIZE = {
  feed: process.env.FEED_PAGE_SIZE ?? 30,
  headlines: process.env.HEADLINES_PAGE_SIZE ?? 30,
};
export const IS_PRODUCTION = isProduction();
