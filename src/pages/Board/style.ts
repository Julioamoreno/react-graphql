import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
        list-style: none;
    }
`;


export const List = styled.ul`
   margin-top: 20px;
`;

export const Message = styled.li`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    justify-content: center;
    width: 250px;
    height: 100px;

    margin: 20px;
    padding: 10px;
    color: #fff;
    background-color: rgba(10, 10, 10, 0.5);

`;
export const DateMessage = styled.p`
    color: rgba(220,220,200, 0.6);
    display: flex;
    justify-content: flex-end;
`;

export const ContentMessage = styled.p`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;
