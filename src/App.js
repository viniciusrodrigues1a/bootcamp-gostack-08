import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  useEffect(() => {
    const storedTechs = localStorage.getItem('techs');

    if (storedTechs) {
      setTechs(JSON.parse(storedTechs));
    }

    // *** ComponentWillUnmount ***
    // return () => {
    //   document.removeEventListener();
    // };
  }, []);

  const techsSize = useMemo(() => techs.length, [techs]);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  return (
    <>
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>{`Você tem ${techsSize} tecnologias`}</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
