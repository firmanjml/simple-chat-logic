let Users = [
  {
    id: 1,
    username: "firmanjml"
  },
  {
    id: 2,
    username: "sabariah"
  },
  {
    id: 3,
    username: "misty"
  }
];

let Messages = [];

let Conversation = [
  {
    id: 1,
    user: [1, 2]
  }
]

function switchUser(id) {
  const user = Users.find((u1) => {
    return u1.id === parseInt(id);
  });


  if (user) {
    $("#username").html(user.username);
  } else {
    throw Error('invalid');
  }

  return user;
}

var currUser = switchUser(1);

function createConversation(participantId) {
  let index = 1;
  if (Conversation.length > 0) {
    index = Conversation.length + 1;
  }

  const user = Users.find((u1) => {
    return ((u1.id === participantId) && (u1.id !== currUser.id))
  });

  if (user === undefined || user === null) {
    throw Error('invalid');
  }

  Conversation.push({
    id: index,
    user: [currUser.id, participantId]
  })
}

function sendMessage(conversationId, message) {
  let index = 1;
  if (Messages.length > 0) {
    index = Messages.length + 1;
  }

  const convo = Conversation.find((c1) => {
    return c1.id === conversationId;
  });

  if (convo === undefined || convo === null) {
    throw Error('invalid');
  }

  const valid = convo.user.find((user) => user === currUser.id);
  
  if (valid === undefined || valid === null) {
    throw Error('invalid');
  }

  Messages.push({
    id: index,
    conversationId,
    message,
    sender: currUser
  })
}

function viewMessages(conversationId) {
  const convo = Conversation.find((convo) => {
    return convo.id === conversationId;
  })

  if (convo === null || convo === undefined) {
    throw Error('invalid');
  }

  const valid = convo.user.find((user) => {
    return user === currUser.id; 
  });

  if (!valid) {
    throw Error('invalid');
  }

  return Messages.filter((m1) => {
    return m1.conversationId === conversationId
  });
}

function addUserToConversation(conversationId, participantId) {
  const convo = Conversation.find((convo) => {
    return convo.id === conversationId;
  })

  if (convo === null || convo === undefined) {
    throw Error('invalid');
  }

  const user = Users.find((u1) => {
    return ((u1.id === participantId) && (u1.id !== currUser.id))
  });

  if (user === undefined || user === null) {
    throw Error('invalid');
  }

  convo.user.push(user.id);
}

$("#switchUser").click(() => {
  const id = $("#user").val();
  currUser = switchUser(id);
  console.log('switched user to id ' + id)
});

$("#sendMsg").click(() => {
  const msg = $("#msg").val();

  sendMessage(1, msg);
})

$("#getMessages").click(() => {
  console.log(viewMessages(1));
})

console.log(Messages.filter((msg) => msg.conversationId == 1))
