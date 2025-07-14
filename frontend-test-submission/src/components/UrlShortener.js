import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

function UrlShortener() {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, field, value) => {
    const newUrls = [...urls];
    newUrls[i][field] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async () => {
    const newResults = [];
    for (const data of urls) {
      try {
        const res = await axios.post('http://localhost:5000/shorturls', data);
        newResults.push(res.data);
      } catch (err) {
        newResults.push({ error: err.response?.data?.error || 'Failed' });
      }
    }
    setResults(newResults);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((entry, i) => (
        <Box key={i} mb={2}>
          <TextField
            label="Long URL"
            fullWidth
            onChange={(e) => handleChange(i, 'url', e.target.value)}
          />
          <TextField
            label="Validity (mins)"
            type="number"
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
          />
          <TextField
            label="Shortcode"
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
          />
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>

      <Box mt={4}>
        {results.map((res, i) => (
          <Box key={i}>
            {res.shortLink ? (
              <Typography>
                <a href={res.shortLink}>{res.shortLink}</a> (Expires: {res.expiry})
              </Typography>
            ) : (
              <Typography color="error">Error: {res.error}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default UrlShortener;