import React, { useEffect, useState } from 'react';
import axios from 'axios';

const [data, setData] = useState([]);
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [error, setError] = useState(null);

const handleSubmit = (e, id = null) => {
    e.preventDefault();
    if (!name || !age) {
      setError('Name and age are required');
      return;
    }
    const url = id
      ? 'https://sweet-tartufo-de62db.netlify.app/.netlify/functions/api/${id}'
      : 'https://sweet-tartufo-de62db.netlify.app/.netlify/functions/api/';
    const method = id ? 'put' : 'post';
    
    // POST or PUT request
    axiosmethod
      .then((response) => {
        if (id) {
          setData(data.map((item) => (item.id === id ? response.data : item)));
        } else {
          setData([...data, response.data]);
        }
        setName('');
        setAge('');
        setError(null);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div onSubmit={handleSubmit}>
      <form>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
        />
        <input
          type='text'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          Placeholder='Age'
        />
        <button type='submit'>Add Data</button>
      </form>
      {errors && (
        <button onClick={() => handleSubmit(null, id)}>Update Data</button>
      )}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.age}
          </li>
        ))}
      </ul>
    </div>
  );
  
  