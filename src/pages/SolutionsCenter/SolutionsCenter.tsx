import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/Button';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import TextField from '../../shared/components/TextField';

import '../../shared/styles/pages/homepage/Homepage.css';
import SolutionsList from '../../shared/components/SolutionsList';
import { FiArrowLeft } from 'react-icons/fi';

export default function SolutionsCenter() {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState('');
  const [keyword, setKeyword] = useState('');

  function handleSearchSolution(event: React.FormEvent) {
    event.preventDefault();
    setKeyword(inputText);
  }

  return (
    <div id="homepage">
      <Header hiddenDropdown={false} />
      <div className="homepage-container">
        <h1>
          <FiArrowLeft
            className="Icon"
            color="var(--color-gray-dark)"
            onClick={() => {
              navigate('/homepage');
            }}
          />
          Centro de Soluções
        </h1>
        <section className="search-or-filter">
          <form className="searchTicket" onSubmit={handleSearchSolution}>
            <TextField
              required={false}
              placeholder={'Buscar por palavra-chave'}
              name="search"
              width="40%"
              type="text"
              height="42px"
              onChange={event => setInputText(event.target.value)}
            />
            <Button width="10%" type="submit" fontSize="0.8rem">
              Buscar
            </Button>
          </form>
        </section>
        <SolutionsList keyword={keyword} type="searchSolution" />
      </div>
      <Footer />
    </div>
  );
}
