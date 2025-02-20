import { useState } from "react";
import Emoji from './icons/emojis';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function FeedbackForm() {
  const [modal, setModal] = useState(false);

  return (
    <div className="feedbackForm d-flex flex-column align-items-center justify-content-center text-center vh-100">
      <h1>Feedback</h1>

      <button onClick={() => setModal((value) => !value)}>Donner mon feedback sur l'UE</button>

      {modal && (
        <div className="shadow p-5 bg-white rounded vw-75 d-flex flex-column align-items-center text-center">
          <FormControl>
            <FormLabel id="row-radio-buttons-group-label">Charge de travail</FormLabel>
            <RadioGroup
              row
              aria-labelledby="row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="happy" control={<Emoji type="happy" />} />
              <FormControlLabel value="angry" control={<Emoji type="angry" />} />
              <FormControlLabel value="heart" control={<Emoji type="heart" />} />
              <FormControlLabel value="coffin" control={<Emoji type="coffin" />} />
            </RadioGroup>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
