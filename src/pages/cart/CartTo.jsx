import { useDispatch, useSelector } from "react-redux";
import { Label, Select } from "../../components/Tags";
import {
  fetchCity2,
  fetchDistrict2,
  fetchProvince2,
  getCity2,
  getDistrict2,
  getIsCartsFromFilled,
  getProvince2,
} from "../../features/cartsSlice";
import { useEffect, useState } from "react";

const CartTo = ({ setDestination }) => {
  const province2 = useSelector(getProvince2);
  const city2 = useSelector(getCity2);
  const district2 = useSelector(getDistrict2);
  const isCartsFormFilled = useSelector(getIsCartsFromFilled);

  const [provId2, setProvId2] = useState(null);
  const [cityId2, setCityId2] = useState(null);
  const [districtId2, setDistrictId2] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isCartsFormFilled) dispatch(fetchProvince2());
  }, [dispatch, isCartsFormFilled]);

  useEffect(() => {
    if (provId2) {
      dispatch(fetchCity2(provId2));
      dispatch(fetchDistrict2(0));
      setDestination(0);
    }
  }, [dispatch, provId2, isCartsFormFilled, setDestination]);

  useEffect(() => {
    if (cityId2) dispatch(fetchDistrict2(cityId2));
  }, [dispatch, cityId2, districtId2]);

  useEffect(() => {
    if (districtId2) setDestination(districtId2);
  }, [setDestination, districtId2]);

  return (
    <div>
      <h2 className="font-semibold text-xl">To</h2>
      <div className="mb-2">
        <Label id="province">Province</Label>
        <Select id="province" onChange={(e) => setProvId2(e.target.value)}>
          {province2.map((prov) => (
            <option key={prov.province_id} value={prov.province_id}>
              {prov.province}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-2">
        <Label id="city">City</Label>
        <Select id="city" onChange={(e) => setCityId2(e.target.value)}>
          {city2.map((cty) => (
            <option key={cty.city_id} value={cty.city_id}>
              {cty.city_name}
            </option>
          ))}
        </Select>
      </div>
      <div className="mb-2">
        <Label id="district">District</Label>
        <Select id="district" onChange={(e) => setDistrictId2(e.target.value)}>
          {district2.map((dis) => (
            <option key={dis.subdistrict_id} value={dis.subdistrict_id}>
              {dis.subdistrict_name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
CartTo.propTypes;

export default CartTo;
