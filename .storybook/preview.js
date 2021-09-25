export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'revolut',
    values: [
      {
        name: 'revolut',
        value: '#f8f8f8',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
}