import { useDispatch, useSelector } from "react-redux";
import { Label, Select } from "../../components/Tags";
import {
  fetchCity,
  fetchDistrict,
  fetchProvince,
  getCity,
  getDistrict,
  getProvince,
  onCartsFromFilled,
} from "../../features/cartsSlice";
import { useEffect, useState } from "react";

const CartFrom = ({ setId }) => {
  const province = useSelector(getProvince);
  const city = useSelector(getCity);
  const district = useSelector(getDistrict);

  const [provId, setProvId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProvince());
  }, [dispatch]);

  useEffect(() => {
    if (provId) {
      dispatch(fetchCity(provId));
      dispatch(fetchDistrict(0));
    }
  }, [dispatch, provId]);

  useEffect(() => {
    if (cityId) dispatch(fetchDistrict(cityId));
  }, [dispatch, cityId]);

  useEffect(() => {
    if (districtId && districtId != 0) {
      setId(districtId);
      dispatch(onCartsFromFilled(true));
    }
  }, [dispatch, districtId, setId]);

  return (
    <div>
      <h2 className="font-semibold text-xl">From</h2>
      <div className="mb-2">
        <Label id="province">Province</Label>
        <Select id="province" onChange={(e) => setProvId(e.target.value)}>
          {province.map((prov) => (
            <option key={prov.province_id} value={prov.province_id}>
              {prov.province}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-2">
        <Label id="city">City</Label>
        <Select id="city" onChange={(e) => setCityId(e.target.value)}>
          {city.map((cty) => (
            <option key={cty.city_id} value={cty.city_id}>
              {cty.city_name}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-2">
        <Label id="district">District</Label>
        <Select id="district" onChange={(e) => setDistrictId(e.target.value)}>
          {district.map((dis) => (
            <option key={dis.subdistrict_id} value={dis.subdistrict_id}>
              {dis.subdistrict_name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
CartFrom.propTypes;

export default CartFrom;
