import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 0.875rem;
  position: relative;


  .logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding:10px;
    border-radius:20px;

    .img {
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
  }
  .logout {
    position: absolute;
    // height:50px;
    overflow:hidden;
    top: 1px;
    width: 100%;
    text-align:center;
    right:0;
    padding: 0.5rem;
    text-transform: capitalize;
    cursor: pointer;
    background-color: var(--primary-500);
    color: var(--white);
    border: transparent;
    border-radius: var(--border-radius);
    letter-spacing: var(--letterspacing);
    display: none;
    font-size:0.8rem;
  }
  .show-logout {

    display: flex;
    width:auto;
  }
`;

export default Wrapper;
