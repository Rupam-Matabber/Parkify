const OK = {
  statusCode: 200,
  statusMessage: "OK",
};

const CREATED = {
  statusCode: 201,
  statusMessage: "Created",
};

const BAD_REQUEST = {
  statusCode: 400,
  statusMessage: "Bad Request. Please check your request.",
};

const UNAUTHORIZED = {
  statusCode: 401,
  statusMessage: "Unauthorized. Please check your credentials.",
};

const FORBIDDEN = {
  statusCode: 403,
  statusMessage: "Forbidden. You are not allowed to access this resource.",
};

const NOT_FOUND = {
  statusCode: 404,
  statusMessage: "Not Found. The resource you are looking for is not found.",
};

const CONFLICT = {
  statusCode: 409,
  statusMessage:
    "Conflict. The resource you are trying to access is already in use.",
};

const SERVER_ERROR = {
  statusCode: 500,
  statusMessage: "Internal Server Error. Please try again later.",
};

const BAD_GATEWAY = {
  statusCode: 502,
  statusMessage: "Bad Gateway. Please try again later.",
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  BAD_GATEWAY,
};
