module.exports = {


  friendlyName: 'Sub',


  description: 'Sub chat.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    sails.sockets.join(this.req, 'chatRoom');
    // All done.
    return;

  }


};
