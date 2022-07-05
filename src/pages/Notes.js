import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Masonry from "react-masonry-css";

import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((resp) => resp.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    // ORIGINAL CONTAINER USING MATERIAL DESIGN
    // <Container>
    //   <Grid container spacing={3}>
    //     {notes.map((note) => (
    //       <Grid item xs={12} md={6} lg={4} key={note.id}>
    //         <NoteCard note={note} handleDelete={handleDelete}></NoteCard>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Container>
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}></NoteCard>
          </div>
        ))}
      </Masonry>
    </Container>
  );
}

// To open the port --> json-server --watch data/db.json --port 8000
