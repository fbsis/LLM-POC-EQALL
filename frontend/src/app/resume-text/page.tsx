"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextareaAutosize,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const FormPage: React.FC = () => {
  const initialText = `
Business Health Evaluation

We begin with a comprehensive assessment of your business’s current standing, analyzing your strategic approach, financial health, market position, and talent management. Our evaluation is designed to identify key areas of strength and pinpoint opportunities for improvement.

Strategic Planning

Our strategic planning services help you define clear, actionable goals and develop a roadmap to achieve them. We focus on aligning your business objectives with market opportunities to maximize growth and sustainability.

Financial Management

We provide detailed financial analyses to improve profitability, enhance operational efficiency, and ensure financial stability. From budgeting to financial forecasting, we equip you with the tools to make informed financial decisions.

Go-to-Market Strategies

Our go-to-market strategies are customized to your unique business needs, helping you achieve optimal market penetration and customer engagement. Our goal is to help you to maximize your sales opportunities, successfully launching new products, and/or enter new markets.

Talent and People Management

We help to assess your corporate culture, vision, values, as well as how you attract, develop, and retain your top talent. Our approach to talent management ensures that your team is prepared, capable, and motivated.

Implementation Services

Beyond planning, our firm stands ready to assist in the implementation of the strategies we develop together. We provide coaching and advisory services to the Board, CEO, and Executive Management team to ensure evidence-based recommendations and best practices are adopted.
  `.trim();

  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setSummary(null);
    setOpen(false);
    try {
      const response = await axios.post("http://localhost:3001/api/sumarizer/", { text });
      setSummary(response.data.result);
      setOpen(true);
    } catch (error) {
      console.error("Error during API call:", error);
      setSummary("Ocorreu um erro ao processar o texto.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="50vh">
      <Typography variant="h4" >
        Resume text
      </Typography>
      <TextareaAutosize
        style={{
          flex: 1,
          padding: 16,
          fontSize: 16,
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Box textAlign="center" padding={2} marginTop="auto">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Send
        </Button>
      </Box>
      <Box padding={2} textAlign="center">
        {loading && <CircularProgress />}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Result</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {summary}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormPage;
