// Import messageError, alert, and messageType modules.
const { messageError } = require("./message");
const { BAD_REQUEST, CONFLICT, SERVER_ERROR } = require("./messageTypes");
const fs = require("fs");
const path = require("path");

// Define handleError function with async/await parameters.
const handleError = async (req, res, err) => {
  // add all the details of error, along with request body and params to logs/error.log file
  const logData = `Error Details:
    Request Body: ${JSON.stringify(req.body)}
    Request Params: ${JSON.stringify(req.params)}
    Error: ${err.toString()}
    Stack Trace: ${err.stack}
    ----------------------------------------
  `;
  const logFilePath = path.join(__dirname, "../logs", "error.log");

  // Check for validation error - if found, use messageError function to send appropriate error message.
  if (err.error === "ValidationError") {
    messageError(res, BAD_REQUEST, err.message, err.name);
  }
  // Check for duplicate key error - if found, use messageError function to send appropriate error message.
  else if (err.code && Number(err.code) === 11000) {
    messageError(
      res,
      CONFLICT,
      `${Object.keys(err.keyValue)[0]} '${
        Object.values(err.keyValue)[0]
      }' already exists.`,
      err.name,
    );
  }
  // Check for error status object - if found, use messageError function to send appropriate error message.
  else if (err.statusObj !== undefined) {
    fs.appendFile(logFilePath, logData, (error) => {
      if (error) {
        console.error("Failed to write error log:", error);
      }
    });
    messageError(res, err.statusObj, err.name, err.type);
  }
  // Check for BSONTypeError - if found, use messageError function to send appropriate error message.
  else if (err.name === "BSONTypeError") {
    messageError(res, BAD_REQUEST, err.message, "MongoError");
  }
  // Check for CastError - if found, use messageError function to send appropriate error message.
  else if (err.name === "CastError") {
    messageError(res, BAD_REQUEST, err.message, "MongoError");
  }
  // Check for otp error - if found, use messageError function to send appropriate error message.
  else if (err.errorTag === "otp") {
    messageError(res, BAD_REQUEST, err.message, "ValidationError");
  }
  // Check for image upload error - if found, use messageError function to send appropriate error message.
  else if (req.originalUrl == "/api/utils/uploadimages") {
    fs.appendFile(logFilePath, logData, (error) => {
      if (error) {
        console.error("Failed to write error log:", error);
      }
    });
    messageError(
      res,
      BAD_REQUEST,
      "There was an error uploading the image. Either the image is too large or the image is not in the correct format. Please try again.",
      "ValidationError",
    );
  }
  // Send other errors that do not match above conditions to webhook and send SERVER_ERROR response using messageError function.
  else {
    console.log(err);
    fs.appendFile(logFilePath, logData, (error) => {
      if (error) {
        console.error("Failed to write error log:", error);
      }
    });
    messageError(res, SERVER_ERROR, err.message, err.name);
  }
};

module.exports = handleError;
