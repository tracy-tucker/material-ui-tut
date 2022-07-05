import React, { useState } from "react";

//Comps
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";

// Functions --> Must be destructured!
import { FormControlLabel, makeStyles } from "@material-ui/core";

//Icons
// import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
// import SendIcon from "@material-ui/icons/Send";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useHistory } from "react-router-dom";

// makeStyles must be created OUTSIDE the component
// const useStyles = makeStyles({
//   btn: {
//     fontSize: 60,
//     backgroundColor: "violet",
//     "&:hover": {
//       backgroundColor: "blue",
//     },
//   },
//   title: {
//     textDecoration: "underline",
//     marginBottom: 20,
//   },
// });

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }

    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };
  return (
    <Container>
      {/* <Typography variant="h1" color="primary" align="center">
        Create a new Note
      </Typography> */}

      <Typography
        // className={classes.title}
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          minRows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio value="money" />} label="Money" />
            <FormControlLabel control={<Radio value="todos" />} label="Todos" />
            <FormControlLabel
              control={<Radio value="reminders" />}
              label="Reminders"
            />
            <FormControlLabel control={<Radio value="work" />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          // className={classes.btn}
          // onClick={() => console.log("You clicked me")}
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      {/* Icons */}
      {/* <br />
      <AcUnitOutlinedIcon />
      <AcUnitOutlinedIcon color="secondary" fontSize="large" />
      <AcUnitOutlinedIcon color="secondary" fontSize="small" />
      <AcUnitOutlinedIcon color="action" fontSize="small" />
      <AcUnitOutlinedIcon color="error" fontSize="small" />
      <AcUnitOutlinedIcon color="disabled" fontSize="small" /> */}

      {/* Buttons */}
      {/* <Button type="submit">SUBMIT</Button>
      <Button type="submit" color="secondary" variant="outlined">
        SUBMIT
      </Button>
      <ButtonGroup color="secondary" variant="contained">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup> */}
    </Container>
  );
}
