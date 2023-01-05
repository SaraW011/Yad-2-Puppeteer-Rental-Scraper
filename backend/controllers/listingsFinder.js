// creates a document in MongoDB
const { Listings } = require("../modals/listings");

const listingsFinder = async (req, res) => {
  const currentDate = new Date();

  try {
    const listing = await Listings.find({
      createdOn: {
        $gte: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        $lt: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        ),
      },
    });
    if (listing) {
      return res.status(200).json({ data: { listing } });
    } else {
      return res.status(404).json({});
    }
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
};

module.exports = { listingsFinder };
