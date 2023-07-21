/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SmallCaptor({ datas }) {
  return (
    <>
      <div>
        <div key={datas.id}>
            <div>
              <div key={datas.id}>
                <h4>
                  <NavLink
                    to={{
                      pathname: `/sensor/${datas.id}`,
                    }}
                    state={{ datas }}
                  >
                    {datas.name}
                  </NavLink>
                </h4>
                <label>
                  <NavLink to={{
                    pathname: `/sensor/edit/${datas.id}`}} state={{ datas }}>
                      Modifier
                      </NavLink>
                </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SmallCaptor.propTypes = {
  datas: PropTypes.object.isRequired
};