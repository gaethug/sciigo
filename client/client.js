Template.main.uptime = function () {
  return moment().format('YYYY/MM/DD hh:mm:ss');
};

Template.main.ROOT_URL = function () {
  return __meteor_runtime_config__.ROOT_URL;
};

Template.main.messages = function () {
  return Messages.find({}, {sort:{createTime:-1}}).map(function (message) {
    if (Meteor.user()) {
      message.userType = message.userName === Meteor.user().profile.name ? 'success' : '';
    }
    message.timeAgo = moment(message.createTime).fromNow();
    return message;
  });
};

// salt for preserve input element
Template.formMessage.preserve({
  'input[id]':function (node) {
    return node.id;
  }
});

Template.formMessage.events = {
  'submit':function () {
    var messageBox = $('input#inputMessage');
    Meteor.call("create_message", Meteor.user(), messageBox.val(), function (error, messageId) {
      if (!error)
        $('input#inputMessage').val('').focus();
    });
  }
};

Template.login.events = {
  'click #logout':function () {
    Meteor.logout();
  },
  'click #loginFB':function () {
    Meteor.loginWithFacebook();
  }
};

/* subscribe */
Meteor.autosubscribe(function() {
  Meteor.subscribe('messages', Session.get('page'));
});