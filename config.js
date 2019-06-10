const config = {
  env: {
    local: {
      apiBase: "//localhost:3000/mock",
    },
    dev: {
      apiBase: "//dev.com/gw/borrow-api",
    },
    demo: {
      apiBase: "//demo.com/gw/borrow-api",
    },
    production: {
      apiBase: "//production.com/gw/borrow-api",
    }
  }
};

module.exports = config;
