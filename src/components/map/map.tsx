import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {DefaultLocation, MapUrl} from '../../const';
import 'leaflet/dist/leaflet.css';
import { City, Offer, OfferInfo, OfferLocation } from '../../types/types';

type MapProps = {
  city: City;
  offers: OfferLocation[];
  selectedOffer: Offer | OfferInfo | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: MapUrl.MarkerDefault,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: MapUrl.MarkerCurrent,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedOffer} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.flyTo([city.location.latitude ?? DefaultLocation.Latitude, city.location.longitude ?? DefaultLocation.Longitude], city.location.zoom);
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
