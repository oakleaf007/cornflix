import Contact from "../models/contact.js"; 

// Add or Update the single contact
export const addContact = async (req, res) => {
  try {
    const data = req.body;

    // Update existing OR insert if none exists
    const contact = await Contact.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true } // upsert = insert if not exists
    );

    res.status(200).json({ message: "Contact saved/updated", contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Get the contact details
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
