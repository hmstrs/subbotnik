import React, { useEffect, useState} from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Col, Spinner } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import gql from "graphql-tag";

import './Top.css'

const GET_GAMES = gql`
	query song($id: ID!) {
		user(id: $id) {
			favourites {
				_id
				title
				artist
			}
		}
	}
`;

const AllUsers = () => {
	const [songs, setSongs] = useState([])

	const getID = () => {
    const token = localStorage.getItem('token');
    const { id } = jwt_decode(token);
    return id;
	};

	const { loading, error, data } = useQuery(GET_GAMES, {
    variables: {id: getID()},
	});

  useEffect(() => {
    if (data) {
			setSongs(data.user.favourites)
		}
		//eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    error && console.log(error);
	}, [error]);

  const MainContent =
    loading || error ? (
			<Spinner animation="border" />
    ) : !songs.length ? (
      <center>
        <p className="fav">
          It seems like you don't have music yet :( <br/> Check our <a href="/explore">daily top</a>.
        </p>
      </center>
    ) : (
			songs.map(({title, artist, _id}) => (
				''
			))
		);

  return (
    <div className="Page">
			<div className="Favourites">
				<Col xs={12} sm={{ span: 10, offset: 1, color: 'black'}} className="header">
					<Col>
						<div className="text">Топ эко-активных</div>
					</Col>
				</Col>
				{MainContent}
			</div>
    </div>
  );
};

export default AllUsers
