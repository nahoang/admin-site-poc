import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  a {
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border: 1px solid;
    margin: 4px;
  }
  a:focus {
    background-color: #DD4B39;
    color: white;
    border-radius: 5px;
  }
`;
const Pagination = ({ pageNumbers, paginate }) => {
  const indexes = [];

  for (let i = 1; i <= pageNumbers; i++) {
    indexes.push(i);
  }
  return (
    <Wrapper className="pagination">
      {indexes.map(number => (
        <a
          key={number}
          className="page-link"
          onClick={() => paginate(number)}
          href="!#"
        >
          {number}
        </a>
      ))}
    </Wrapper>
  );
};

export default Pagination;
