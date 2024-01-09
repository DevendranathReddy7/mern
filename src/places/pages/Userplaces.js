import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const Dummy_places = [
  {
    id: "p1",
    title: "Taj Mahal",
    description: "7th Wonder",
    imageURL: "https://source.unsplash.com/random/200x200?sig=2",
    address:
      "Dharmapuri, Forest Colony, Tajganj, Agra, Up, Agra, Uttar Pradesh 282001",
    location: {
      lat: 27.173891,
      lng: 78.042068,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Taj Mahal 2",
    description: "7th Wonder",
    imageURL: "https://source.unsplash.com/random/200x200?sig=1",
    address:
      "Dharmapuri, Forest Colony, Tajganj, Agra, Up, Agra, Uttar Pradesh 282001",
    location: {
      lat: 27.173891,
      lng: 78.042068,
    },
    creator: "u2",
  },
  {
    id: "p3",
    title: "Taj Mahal 3",
    description: "7th Wonder",
    imageURL:
      "https://blankinship-web.com/sabbatical01/India/Taj_Mahal/taj-21.jpg",
    address:
      "Dharmapuri, Forest Colony, Tajganj, Agra, Up, Agra, Uttar Pradesh 282001",
    location: {
      lat: 27.173891,
      lng: 78.042068,
    },
    creator: "u3",
  },
];
const Userplaces = () => {
  const currentUser = useParams().userid;
  console.log(currentUser, typeof currentUser);

  const filteredPlaces = Dummy_places.filter(
    (place) => place.creator === currentUser
  );
  return <PlaceList items={filteredPlaces} />;
};
export default Userplaces;
