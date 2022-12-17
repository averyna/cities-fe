import React, {useEffect, useState} from "react";
import axios from "axios";

const CityProfiles = () => {
  const [cities, setCities] = useState([]);
  const fetchCities = () => {
    axios.get('http://localhost:8099/cities').then(res => {
      console.log(res);
      setCities(res.data);
    });
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return cities.map((city, index) => {
    return (
        <div key={index}>
          <h1>{city.name}</h1>
          <p>{city.id}</p>
          <p>{city.photoUrl}</p>
        </div>
    )
  })
};

export default CityProfiles;
