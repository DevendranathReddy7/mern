import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taj Mahal",
    description:
      "One of the most famous construction in the world! & it's one of the 7 wonders",
    imageUrl:
      "http://1.bp.blogspot.com/-3mUa4Z5ria0/ToRV3GwN0GI/AAAAAAAAAQ8/kA71S1kIesE/s1600/Taj+Mahal.jpg",
    address: "agra",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
