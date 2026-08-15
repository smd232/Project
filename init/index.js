if(process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
  // require("dotenv").config();
}



const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);

  await initDB();

  const data = await Listing.find({});
  console.log(data.length);

  console.log("DB connected");
}

const initDB = async () => {
  await Listing.deleteMany({});

  for (let obj of initData.data) {
    let response = await geocodingClient
      .forwardGeocode({
        query: `${obj.location}, ${obj.country}`,
        limit: 1
      })
      .send();

      console.log("Geocode result for", obj.title, ":", response.body.features[0]?.geometry);

       const newListing = new Listing({
      ...obj,
      owner: "6a77777ed95451e21c24b101",
      geometry: response.body.features[0].geometry
    });

    await newListing.save();
  }
    console.log("data was initialized");
  }

  main().catch((err) => {
    console.log(err);
  });