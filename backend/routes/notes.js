const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Getting All the notes using: Get "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a New Notes using: Post "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Ttile").isLength({ min: 3 }),
    body("description", "Desctiption must be atleast 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are error return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update exsisting Notes using: Put "/api/notes/updatenote". Login required
router.put("/updatenote/:id",fetchuser , async (req, res) => {
  const {title, description, tag} = req.body;

  try {
  //Create a new Object

  const newNote = {}
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}

  //Find note to be Updated and to update it

  let note = await Notes.findById(req.params.id)
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note})
} catch (err) {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
}
})

//ROUTE 4: Delete exsisting Notes using: Delete "/api/notes/deletenote". Login required
router.delete("/deletenote/:id",fetchuser , async (req, res) => {
  // const {title, description, tag} = req.body;

  try { 
  //Find note to be Updated and to update it
  let note = await Notes.findById(req.params.id)
  if(!note){return res.status(404).send("Not Found")}

  //Update note only if User owns this Note
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({success: "Successfully deleted your Note", note: note})
} catch (err) {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
}
})


module.exports = router;
