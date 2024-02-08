import { useEffect, useState } from "react";
import CartFrom from "./CartFrom";
import CartTo from "./CartTo";
import { useDispatch, useSelector } from "react-redux";
import { fetchOngkir, getErrorOrder, getOngkir, getOrder, getStatusOrder, getWeight } from "../../features/cartsSlice";
import { Link, useNavigate } from "react-router-dom";
import { Label, Select } from "../../components/Tags";
import { submitOrder } from "../../features/orderSlice";

const StatusWrapper = ({ children }) => <p className="border p-2 rounded">{children}</p>;
StatusWrapper.propTypes;

const Ongkir = () => {
  const dispatch = useDispatch();
  const weight = useSelector(getWeight);
  const ongkir = useSelector(getOngkir);
  const order = useSelector(getOrder);
  const statusOrder = useSelector(getStatusOrder);
  const errorOrder = useSelector(getErrorOrder);

  const [id, setId] = useState("");
  const [selectedOngkir, setSelectedOngkir] = useState("");
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (weight == 0) {
      navigate("/carts");
    }
  }, [weight, navigate]);

  useEffect(() => {
    if (destination) {
      dispatch(fetchOngkir({ id, destination, weight }));
    }
  }, [dispatch, destination, id, weight]);

  const onOrder = (e) => {
    e.preventDefault();
    dispatch(submitOrder(order));
  };

  const resultOngkir =
    ongkir && ongkir.length > 0 ? (
      <>
        <div>
          <Label id="ongkir">Pilih Ongkir</Label>
          <Select id="ongkir" onChange={(e) => setSelectedOngkir(e.target.value)}>
            {ongkir.map((okr, i) => (
              <option key={i} value={okr.cost.value}>
                Rp{okr.cost[0].value.toLocaleString("id-ID")} - {okr.service} - {okr.description}
              </option>
            ))}
          </Select>
        </div>
        <div></div>
        <Link to={"../invoice"}>
          <button
            type="submit"
            disabled={!selectedOngkir}
            className="border bg-blue-500 text-white rounded p-2 hover:opacity-70 disabled:opacity-70"
          >
            Order
          </button>
        </Link>
      </>
    ) : null;

  let contentOngkir;
  if (statusOrder === "loading") {
    contentOngkir = <StatusWrapper>Loading data...</StatusWrapper>;
  } else if (statusOrder === "succeeded") {
    contentOngkir = resultOngkir;
  } else if (statusOrder === "failed") {
    contentOngkir = (
      <StatusWrapper>
        <span className="text-rose-500">{errorOrder}</span>
      </StatusWrapper>
    );
  }

  return (
    <section className="py-3">
      <form onSubmit={onOrder} className="bg-white p-3 grid grid-cols-2 gap-3 rounded">
        <CartFrom setId={setId} />
        <CartTo setDestination={setDestination} />
        {destination != 0 && contentOngkir}
      </form>
    </section>
  );
};

export default Ongkir;
