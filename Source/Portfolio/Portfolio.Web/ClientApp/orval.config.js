module.exports = {
  portfolio: {
    input: {
      target: './src/api/documentation/PortfolioApi.json',
    },
    output: {
      target: './src/api/generated/content.ts',
      schemas: './src/api/models',
      client: 'react-query',
      mode: 'split',
    },
  },
};
