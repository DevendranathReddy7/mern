import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const Dummy_places = [
  {
    id: "p1",
    title: "Taj Mahal",
    description: "7th Wonder",
    imageURL:
      "https://th.bing.com/th?id=OLC.C8keJXqzbXfyYg480x360&w=210&h=140&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
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
    title: "Taj Mahal",
    description: "7th Wonder",
    imageURL:
      "https://i1.wp.com/worldupclose.in/wp-content/uploads/2020/03/taj.jpg",
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
    title: "Taj Mahal",
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
