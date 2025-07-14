import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

function Statistics() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/shorturls/${shortcode}`);
      setStats(res.data);
    } catch (e) {
      setStats({ error: e.response?.data?.error || 'Unknown Error' });
    }
  };

  return (
    <Box p={4}>
      <TextField
        label="Shortcode"
        onChange={(e) => setShortcode(e.target.value)}
      />
      <Button onClick={fetchStats}>Get Stats</Button>

      {stats && (
        <Box mt={4}>
          {stats.error ? (
            <Typography color="error">{stats.error}</Typography>
          ) : (
            <>
              <Typography>Total Clicks: {stats.totalClicks}</Typography>
              <Typography>Original URL: {stats.originalUrl}</Typography>
              <Typography>Created At: {stats.createdAt}</Typography>
              <Typography>Expires At: {stats.expiresAt}</Typography>
              <Box>
                {stats.clicks.map((click, i) => (
                  <Typography key={i}>
                    {click.time} | {click.referrer} | {click.location}
                  </Typography>
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Statistics;