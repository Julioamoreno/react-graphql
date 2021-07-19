import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useSubscription } from '@apollo/client';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { Container, List, Message, DateMessage, ContentMessage } from './style';

const GET_ALL_MESSAGES = gql`
  query getMessage($userID: Float!){
  getMessagesFromUser(userID: $userID) {
    content,
    createdAt
  }
}
`;

const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded {
    messageAdded {
      id,
      createdAt,
      content,
      user {
        email
      }
    }
  }
  
`;

type MessageType = {
  id: number;
  createdAt: string;
  content: string;
  user: {
    email: string;
  }
}

export default function Board() {
  const history = useHistory();
  const id = history.location.search.split('=')[1];
  console.log(history.location.search.split('=')[1])
  const { loading, error,  data } = useQuery(GET_ALL_MESSAGES, {
    variables: { userID: parseInt(id) }
  });
  const arrayMessage = useSubscription(COMMENTS_SUBSCRIPTION); 
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    console.log(arrayMessage)
    if (!arrayMessage.data) return;
    setMessages(acc => [...acc, arrayMessage.data.messageAdded])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayMessage.data])


  useEffect(() => {
    if (error) return console.log(error);
    if (!data) return;
    console.log(data)
    setMessages(data.getMessagesFromUser)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) return <p>LOADING ... </p>;
  return (
    <Container>
      {!loading && messages.length === 0 && (<p>Nenhuma mensagem</p>)}
      <List>
        {messages.map(({content, createdAt}, idx) => (
          <Message key={idx}>
            <DateMessage>
              { moment(createdAt).format('DD/MM/YYYY') }
            </DateMessage>
            <ContentMessage>
              {content} 
            </ContentMessage>
            </Message>
        ))}
      </List>
    
    </Container>
  );
}
