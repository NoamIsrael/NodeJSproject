const morgan = require('morgan');

const loggerFormat = ':method :url :status :res[content-length] - :response-time ms';

const loggerMiddleware = morgan(loggerFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stdout,
});

module.exports = loggerMiddleware;