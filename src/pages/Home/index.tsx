import React, { useState, useEffect } from 'react';
import { Container, Content, Input, Button } from './styles';
import { FaCheck } from 'react-icons/fa';
import { History } from 'history';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks';

export const CREATE_OR_LOGIN = gql`
    mutation createUserOrAuthentication( $email: String! ) {
        createUserOrAuthentication(data: { email: $email }) {
            id
            email 
	    }
    }
`;


 const Home: React.FC<{ history:  History}> = ({ history }) => {
    const [input, setInput] = useState('');
    const [createUserOrAuthentication, { data }] = useMutation(CREATE_OR_LOGIN);

    useEffect(() => {
        if(!data) return;
        const { id, email } = data.createUserOrAuthentication;
        console.log(email)
        history.push(`/dashboard?id=${id}`, { email })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const handleRegisterOrLogin = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (input.length < 1) {
            return alert('Email obrigatório')
        }
        await createUserOrAuthentication({ variables: { email: input } });
    }
  return (
    <Container>
        <Content>
            <form>
                <Input placeholder="E-mail" value={input} onChange={(event) => setInput(event.target.value)} />
                <Button onClick={(e) => handleRegisterOrLogin(e)}>
                    <FaCheck size={36} color='#fff' />
                    <span>
                        Login or Register
                    </span>
                </Button>
            </form>
        </Content>
    </Container>
  );
}
export default Home;