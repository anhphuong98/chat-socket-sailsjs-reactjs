module.exports = {


  friendlyName: 'Send message',


  description: '',


  inputs: {
    text: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let text = inputs.text;
    sails.sockets.broadcast('chatRoom', 'message', text);
    // All done.
    return this.res.ok(text);
  }


};
