import styled from 'styled-components'

// componente de boton con styled componentes
const Button = styled.button`
    width: ${props => props.normal && '100%' };
    background: ${props => props.primary ? '#236ee8' : '#c70630'};
    border-radius: 8px;
    color: white;
    padding: 10px 20px;
    margin-bottom: 5px;
    border: none;
    &:hover {
        background : ${ props => props.primary ? '#6b81d1' : '#7a041e' }
    };
    font-weight: bold;
`;

export default Button