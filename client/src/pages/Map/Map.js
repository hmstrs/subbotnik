import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import TextInput from '../../components/TextInput/TextInput';
import ReactMapboxGL, {
  GeolocateControl,
  FullscreenControl,
  Marker
} from 'react-map-gl';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Spinner } from 'react-bootstrap';
import gql from 'graphql-tag';

import './Map.css';

const GET_ALL_LOCATIONS = gql`
  query getAllLocations($all: String!) {
    getAllLocations(all: $all) {
      location
    }
  }
`;

const POST_LOCATION = gql`
  mutation markLocation(
    $point: String!
    $title: String!
    $description: String!
  ) {
    markLocation(point: $point, title: $title, description: $description) {
      status
      location
    }
  }
`;

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 50.45466,
    longitude: 30.5238,
    zoom: 12
  });

  const { loading, error, data } = useQuery(GET_ALL_LOCATIONS, {
    variables: {
      all: ''
    }
  });
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  const [showModal, setShowModal] = useState(false);

  const [markers, setMarkers] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    point: ''
  });
  const [chunk, setChunk] = useState({});

  const [errors, setErrors] = useState({});
  const handleClick = ({ point, lngLat }) => {
    setInputs({ ...inputs, point: lngLat.join(';') });
    setShowModal(!showModal);
    setChunk({ point, longitude: lngLat[0], latitude: lngLat[0] });
  };
  const [postLocation] = useMutation(POST_LOCATION);

  const onSubmit = () => {
    postLocation({
      variables: inputs
    })
      .then(res => {
        setErrors({});
        console.log(res);

        setMarkers(markers => [...markers, { ...chunk }]);
      })
      .catch(err => {
        // console.log(err);
        if (err.graphQLErrors.length > 0) {
          const { code, errors } = err.graphQLErrors[0].extensions;
          code === 'BAD_USER_INPUT' && setErrors(errors);
        } else setErrors({ ...errors, description: err.networkError.message });
      });
  };

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10
  };

  console.log(markers);

  const MainContent =
    loading || error ? (
      <Spinner />
    ) : (
      <ReactMapboxGL
        onClick={handleClick}
        {...viewport}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1Ijoiam5scCIsImEiOiJjanhidGR5dHEwZXI1M3pwbm1idHc0dDM0In0.tgBZDXu3EQCAcYoHHIw_ZA"
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: false }}
          fitBoundsOptions={{ maxZoom: 12 }}
          trackUserLocation={true}
        />
        <div style={{ position: 'absolute', right: 10 }}>
          <FullscreenControl />
        </div>
        {markers.map((m, i) => (
          <Marker longitude={m.longitude} latitude={m.latitude} key={i}>
            <span className="dot red"></span>
          </Marker>
        ))}
      </ReactMapboxGL>
    );

  return (
    <div>
      <div>{MainContent}</div>
      <div>
        <Modal
          centered
          size="sm"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header className="main-color" closeButton>
            Добавить локацию
          </Modal.Header>
          <Modal.Body className="main-color">
            <form>
              <div className="form-group mx-auto">
                <Row>
                  <Col>
                    <TextInput
                      className="mx-auto"
                      error={errors.title}
                      type="title"
                      name="title"
                      placeholder="Название локации"
                      value={inputs.title}
                      onChange={onChange}
                    />
                    <TextInput
                      className="mx-auto"
                      error={errors.description}
                      type="description"
                      name="description"
                      placeholder="Описание"
                      value={inputs.description}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </div>
            </form>
          </Modal.Body>
          <Button onClick={onSubmit} variant="secondary">
            Подтвердить
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default Map;
