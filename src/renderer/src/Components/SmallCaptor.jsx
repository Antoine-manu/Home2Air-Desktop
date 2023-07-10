import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SmallCaptor({ datas }) {
  console.log(datas);
  return (
    <>
      <div>
        <div key={datas.id}>
          <div>
            <h3>{datas.name}</h3>
            <div>
              <div key={datas.id}>
                <h4>
                  <Link
                    to="/SingleSensor"
                    state={{
                      datas: JSON.stringify(datas)
                    }}
                  >
                    {datas.name}
                  </Link>
                </h4>
              </div>
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
