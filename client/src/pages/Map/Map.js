import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'react-bootstrap';
import gql from 'graphql-tag';

import './Map.css';

const GET_LOCATIONS = gql`
  query locations($id: ID!) {
		locations(id: $id) {
			coords
		}
  }
`;

const Map = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS, {});

  useEffect(() => {
    if (data) {

    }
  }, [data]);

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  const MainContent =
    loading || error ? (
      <Spinner animation="border" />
    ) : (
      'map here'
    );

  return (
    <div className="Page">
      <div className="History">
        {MainContent}
      </div>
    </div>
  );
};

export default Map;
