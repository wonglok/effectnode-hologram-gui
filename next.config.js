const withTM = require("next-transpile-modules")(["three"]);
module.exports = withTM();

module.exports.images = module.exports.images || {};
module.exports.images.domains = module.exports.domains || [];
module.exports.images.domains.push("res.cloudinary.com");
