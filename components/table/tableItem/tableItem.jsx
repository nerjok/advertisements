import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,  faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import PropTypes from 'prop-types';


export const TableItem = ({name, email, _id}) => {

  return (
        <div className="row advertisements-row advertisements-row--red">
          <div className="col-md-5 advertisements-row__description">
            <h5>{name}</h5>
            {email}
          </div>
          <div className="col-md-2 flex" styles={{background: 'lightgray'}}>
              <span className="badge badge-success advertisements-row__badge">Active</span>
          </div>
          <div className="col-md-2 flex">
              <span className="advertisements-row__info-txt">Vilnius</span> 
          </div>
          <div className="col-md-3 flex">
            <div className="advertisements-row__info-txt">
              <Link href={`/profiles/${_id}`}>
                <a  className="btn btn-sm btn-outline-info">
                  <FontAwesomeIcon icon={faSearch} size="lg" width={16} style={{color: 'lightblue'}} />
                </a>
              </Link>
              <a href="#ff" className="btn btn-sm btn-outline-danger m-1">
                <FontAwesomeIcon icon={faHeart} size="lg" width={16} style={{color: 'red'}} />
              </a>
            </div>
          </div>
        </div>
      )
}

TableItem.protoTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
}
