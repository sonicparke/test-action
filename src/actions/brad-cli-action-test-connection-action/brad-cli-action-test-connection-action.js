exports.handler = (async (input, context) => {
  // You will receive the input as described for your action
  const { param1, param2 } = input;

  console.log('Executing action brad-cli-action-test');

  // You must return the output as described for your action
  return {
    result: 'success'
  };
});
